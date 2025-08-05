export class Health {
  private _points = 30;

  decrease(amount: number): void {
    this._points -= amount;
  }

  get points(): number {
    return this._points;
  }
}