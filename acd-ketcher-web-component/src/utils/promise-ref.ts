// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export class PromiseRef<T> {
  #pending = true;
  #resolve: (value: T) => void = noop;
  #reject: (error: unknown) => void = noop;

  public readonly promise: Promise<T>;

  public constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.#resolve = resolve;
      this.#reject = reject;
    });
    // to avoid unhandled promise rejection errors in console
    this.promise.catch(noop);
  }

  public isPending(): boolean {
    return this.#pending;
  }

  public resolve(value: T): void {
    this.#pending = false;
    this.#resolve(value);
  }

  public reject(value: unknown): void {
    this.#pending = false;
    this.#reject(value);
  }
}
