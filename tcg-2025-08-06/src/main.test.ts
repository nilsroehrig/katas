import {describe, expect, test } from "vitest";

describe("Health", () => {
  test("should initialize with 30 points", () => {
    const health = new Health();
    expect(health.points).toBe(30);
  })
  test("should decrease points", () => {
    const health = new Health();
    health.decrease(10);
    expect(health.points).toBe(20);
  })
})

export class Health {
  private _points = 30;

  decrease(amount: number): void {
    this._points -= amount;
  }

  get points(): number {
    return this._points;
  }
}