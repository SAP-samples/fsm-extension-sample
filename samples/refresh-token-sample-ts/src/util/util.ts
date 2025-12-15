export class BehaviorSubject<T> {
  private subscribers: Array<(value: T) => void> = [];
  private currentValue: T;

  constructor(initialValue: T) {
    this.currentValue = initialValue;
  }

  public subscribe(callback: (value: T) => void): () => void {
    // Emit the current value to the new subscriber
    callback(this.currentValue);
    
    this.subscribers.push(callback);
    
    // Return an unsubscribe function
    return () => {
      const index = this.subscribers.indexOf(callback);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }

  // Emit a new value to all subscribers
  public next(value: T): void {
    this.currentValue = value;
    this.subscribers.forEach(callback => callback(value));
  }

  // Edge case for non reactive access to the current value
  public getValue(): T {
    return this.currentValue;
  }
}
