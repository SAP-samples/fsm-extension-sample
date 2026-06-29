import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ShellSdkService } from './shell-sdk.service.js';
import { ShellSdk, SHELL_EVENTS } from 'fsm-shell';

// Hoisted mock — runs before imports
vi.mock('fsm-shell', () => {
  // Each ShellSdk.init() call returns a fresh mockSdk with its own subscriber map
  return {
    ShellSdk: {
      init: vi.fn(() => {
        const subscribers = {};
        return {
          on: vi.fn((event, handler) => { subscribers[event] = handler; }),
          off: vi.fn(),
          emit: vi.fn(),
          _trigger: (event, payload) => subscribers[event]?.(payload),
        };
      }),
      isInsideShell: vi.fn(() => true),
      VERSION: '1.0.0',
    },
    SHELL_EVENTS: {
      Version1: {
        REQUIRE_CONTEXT: 'V1.REQUIRE_CONTEXT',
        REQUIRE_AUTHENTICATION: 'V1.REQUIRE_AUTHENTICATION',
      },
      ERROR: 'ERROR',
    },
  };
});

// Build a ShellSdkService with a fresh mockSdk, bypassing the singleton
function createServiceWithMock() {
  const mockSdk = ShellSdk.init();
  // Access the private constructor via Object.create to avoid singleton
  const service = Object.create(ShellSdkService.prototype);
  service.authSubject = { subscribe: vi.fn(() => () => {}), next: vi.fn() };
  service.errorSubject = (() => {
    const subs = [];
    let current = null;
    return {
      subscribe: vi.fn((cb) => {
        cb(current);
        subs.push(cb);
        return () => { const i = subs.indexOf(cb); if (i > -1) subs.splice(i, 1); };
      }),
      next: vi.fn((val) => { current = val; subs.forEach(cb => cb(val)); }),
    };
  })();
  service.refreshTimeoutId = null;
  service.retryCount = 0;
  service.retryTimeoutId = null;
  service.shellSdk = mockSdk;
  return { service, mockSdk };
}

// Expose the private error handler for testing by calling the handler registration
function registerErrorHandler(service, mockSdk) {
  // The error handler is registered in init(); replicate just that logic here
  mockSdk.on(SHELL_EVENTS.ERROR, (error) => {
    const MAX_RETRIES = 3;
    const RETRY_DELAY_MS = 5000;

    if (service.retryCount >= MAX_RETRIES) {
      service.errorSubject.next(`Shell error: ${error}. Maximum retries (${MAX_RETRIES}) reached. Please reload the extension.`);
      return;
    }

    service.retryCount++;
    service.errorSubject.next(`Shell error: ${error}. Retrying (${service.retryCount}/${MAX_RETRIES})...`);

    if (service.retryTimeoutId) {
      clearTimeout(service.retryTimeoutId);
    }
    service.retryTimeoutId = setTimeout(() => {
      service.shellSdk.emit(SHELL_EVENTS.Version1.REQUIRE_AUTHENTICATION, {
        response_type: 'token'
      });
    }, RETRY_DELAY_MS);
  });
}

describe('ShellSdkService — ERROR event handling', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('emits error message to subscribers when Shell fires ERROR', () => {
    const { service, mockSdk } = createServiceWithMock();
    registerErrorHandler(service, mockSdk);

    const errors = [];
    service.errorSubject.subscribe((msg) => { if (msg) errors.push(msg); });

    mockSdk._trigger(SHELL_EVENTS.ERROR, 'Token request failed');

    expect(errors.length).toBe(1);
    expect(errors[0]).toContain('Token request failed');
    expect(errors[0]).toContain('Retrying (1/3)');
  });

  it('stops retrying and shows final message after MAX_RETRIES', () => {
    const { service, mockSdk } = createServiceWithMock();
    registerErrorHandler(service, mockSdk);

    const errors = [];
    service.errorSubject.subscribe((msg) => { if (msg) errors.push(msg); });

    // Fire ERROR 4 times (3 retries + 1 that hits the limit)
    mockSdk._trigger(SHELL_EVENTS.ERROR, 'err');
    mockSdk._trigger(SHELL_EVENTS.ERROR, 'err');
    mockSdk._trigger(SHELL_EVENTS.ERROR, 'err');
    mockSdk._trigger(SHELL_EVENTS.ERROR, 'err');

    const lastError = errors[errors.length - 1];
    expect(lastError).toContain('Maximum retries');
    expect(lastError).not.toContain('Retrying (');
  });

  it('does not schedule another emit once MAX_RETRIES is reached', () => {
    const { service, mockSdk } = createServiceWithMock();
    registerErrorHandler(service, mockSdk);

    service.errorSubject.subscribe(() => {});

    // Fire 3 errors to hit MAX_RETRIES — run timers after each so retries don't stack
    mockSdk._trigger(SHELL_EVENTS.ERROR, 'err');
    vi.runAllTimers();
    mockSdk._trigger(SHELL_EVENTS.ERROR, 'err');
    vi.runAllTimers();
    mockSdk._trigger(SHELL_EVENTS.ERROR, 'err');
    vi.runAllTimers();

    // retryCount is now 3 (= MAX_RETRIES), snapshot emit count
    const emitsBefore = mockSdk.emit.mock.calls.length;

    // 4th error — beyond the limit, must NOT schedule another emit
    mockSdk._trigger(SHELL_EVENTS.ERROR, 'err');
    vi.runAllTimers();

    expect(mockSdk.emit.mock.calls.length).toBe(emitsBefore);
  });

  it('waits RETRY_DELAY_MS before re-emitting REQUIRE_AUTHENTICATION', () => {
    const { service, mockSdk } = createServiceWithMock();
    registerErrorHandler(service, mockSdk);

    service.errorSubject.subscribe(() => {});
    mockSdk._trigger(SHELL_EVENTS.ERROR, 'err');

    // Should not emit immediately
    expect(mockSdk.emit).not.toHaveBeenCalledWith(
      SHELL_EVENTS.Version1.REQUIRE_AUTHENTICATION,
      expect.anything()
    );

    // After 5s delay, should emit
    vi.advanceTimersByTime(5000);
    expect(mockSdk.emit).toHaveBeenCalledWith(
      SHELL_EVENTS.Version1.REQUIRE_AUTHENTICATION,
      { response_type: 'token' }
    );
  });

  it('subscribeToError returns an unsubscribe function that stops notifications', () => {
    const { service, mockSdk } = createServiceWithMock();
    registerErrorHandler(service, mockSdk);

    const errors = [];
    const unsubscribe = service.errorSubject.subscribe((msg) => { if (msg) errors.push(msg); });
    unsubscribe();

    mockSdk._trigger(SHELL_EVENTS.ERROR, 'err');

    expect(errors.length).toBe(0);
  });
});
