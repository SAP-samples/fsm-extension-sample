import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ShellSdk, SHELL_EVENTS } from 'fsm-shell';

vi.mock('fsm-shell', () => {
  return {
    ShellSdk: {
      init: vi.fn(() => {
        const subscribers: Record<string, (payload: unknown) => void> = {};
        return {
          on: vi.fn((event: string, handler: (payload: unknown) => void) => {
            subscribers[event] = handler;
          }),
          off: vi.fn(),
          emit: vi.fn(),
          _trigger: (event: string, payload: unknown) => subscribers[event]?.(payload),
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

type MockSdk = {
  on: ReturnType<typeof vi.fn>;
  off: ReturnType<typeof vi.fn>;
  emit: ReturnType<typeof vi.fn>;
  _trigger: (event: string, payload: unknown) => void;
};

interface ErrorHandlerState {
  retryCount: number;
  retryTimeoutId: ReturnType<typeof setTimeout> | null;
  shellSdk: MockSdk;
  errorSubject: {
    subscribe: (cb: (v: string | null) => void) => () => void;
    next: (v: string | null) => void;
  };
}

function createState(): ErrorHandlerState {
  const mockSdk = (ShellSdk.init as unknown as () => MockSdk)();

  const subs: Array<(v: string | null) => void> = [];
  let current: string | null = null;
  const errorSubject = {
    subscribe: vi.fn((cb: (v: string | null) => void) => {
      cb(current);
      subs.push(cb);
      return () => { const i = subs.indexOf(cb); if (i > -1) subs.splice(i, 1); };
    }),
    next: vi.fn((val: string | null) => { current = val; subs.forEach(cb => cb(val)); }),
  };

  return { retryCount: 0, retryTimeoutId: null, shellSdk: mockSdk, errorSubject };
}

function registerErrorHandler(state: ErrorHandlerState) {
  const MAX_RETRIES = 3;
  const RETRY_DELAY_MS = 5000;

  state.shellSdk.on(SHELL_EVENTS.ERROR, (error: unknown) => {
    if (state.retryCount >= MAX_RETRIES) {
      state.errorSubject.next(`Shell error: ${error}. Maximum retries (${MAX_RETRIES}) reached. Please reload the extension.`);
      return;
    }

    state.retryCount++;
    state.errorSubject.next(`Shell error: ${error}. Retrying (${state.retryCount}/${MAX_RETRIES})...`);

    if (state.retryTimeoutId) {
      clearTimeout(state.retryTimeoutId);
    }
    state.retryTimeoutId = setTimeout(() => {
      state.shellSdk.emit(SHELL_EVENTS.Version1.REQUIRE_AUTHENTICATION, { response_type: 'token' });
    }, RETRY_DELAY_MS);
  });
}

describe('ShellSdkService — ERROR event handling', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('emits error message to subscribers when Shell fires ERROR', () => {
    const state = createState();
    registerErrorHandler(state);

    const errors: string[] = [];
    state.errorSubject.subscribe((msg) => { if (msg) errors.push(msg); });

    state.shellSdk._trigger(SHELL_EVENTS.ERROR, 'Token request failed');

    expect(errors.length).toBe(1);
    expect(errors[0]).toContain('Token request failed');
    expect(errors[0]).toContain('Retrying (1/3)');
  });

  it('stops retrying and shows final message after MAX_RETRIES', () => {
    const state = createState();
    registerErrorHandler(state);

    const errors: string[] = [];
    state.errorSubject.subscribe((msg) => { if (msg) errors.push(msg); });

    state.shellSdk._trigger(SHELL_EVENTS.ERROR, 'err');
    state.shellSdk._trigger(SHELL_EVENTS.ERROR, 'err');
    state.shellSdk._trigger(SHELL_EVENTS.ERROR, 'err');
    state.shellSdk._trigger(SHELL_EVENTS.ERROR, 'err');

    const lastError = errors[errors.length - 1];
    expect(lastError).toContain('Maximum retries');
    expect(lastError).not.toContain('Retrying (');
  });

  it('does not schedule another emit once MAX_RETRIES is reached', () => {
    const state = createState();
    registerErrorHandler(state);

    state.errorSubject.subscribe(() => {});

    state.shellSdk._trigger(SHELL_EVENTS.ERROR, 'err');
    vi.runAllTimers();
    state.shellSdk._trigger(SHELL_EVENTS.ERROR, 'err');
    vi.runAllTimers();
    state.shellSdk._trigger(SHELL_EVENTS.ERROR, 'err');
    vi.runAllTimers();

    const emitsBefore = (state.shellSdk.emit as ReturnType<typeof vi.fn>).mock.calls.length;

    state.shellSdk._trigger(SHELL_EVENTS.ERROR, 'err');
    vi.runAllTimers();

    expect((state.shellSdk.emit as ReturnType<typeof vi.fn>).mock.calls.length).toBe(emitsBefore);
  });

  it('waits RETRY_DELAY_MS before re-emitting REQUIRE_AUTHENTICATION', () => {
    const state = createState();
    registerErrorHandler(state);

    state.errorSubject.subscribe(() => {});
    state.shellSdk._trigger(SHELL_EVENTS.ERROR, 'err');

    expect(state.shellSdk.emit).not.toHaveBeenCalledWith(
      SHELL_EVENTS.Version1.REQUIRE_AUTHENTICATION,
      expect.anything()
    );

    vi.advanceTimersByTime(5000);
    expect(state.shellSdk.emit).toHaveBeenCalledWith(
      SHELL_EVENTS.Version1.REQUIRE_AUTHENTICATION,
      { response_type: 'token' }
    );
  });

  it('subscribeToError returns an unsubscribe function that stops notifications', () => {
    const state = createState();
    registerErrorHandler(state);

    const errors: string[] = [];
    const unsubscribe = state.errorSubject.subscribe((msg) => { if (msg) errors.push(msg); });
    unsubscribe();

    state.shellSdk._trigger(SHELL_EVENTS.ERROR, 'err');

    expect(errors.length).toBe(0);
  });
});
