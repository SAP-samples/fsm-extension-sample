export class BehaviorSubject {
  constructor(initialValue) {
    this.subscribers = [];
    this.currentValue = initialValue;
  }

  subscribe(callback) {
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
  next(value) {
    this.currentValue = value;
    this.subscribers.forEach(callback => callback(value));
  }

  // Edge case for non reactive access to the current value
  getValue() {
    return this.currentValue;
  }
}
