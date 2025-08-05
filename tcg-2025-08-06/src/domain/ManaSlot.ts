export class ManaSlot {
  private _empty = true;

  refill(): void {
    this._empty = false;
  }

  use(): void {
    this._empty = true;
  }

  get empty(): boolean {
    return this._empty;
  }
}