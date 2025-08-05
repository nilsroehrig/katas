import {describe, expect, test } from "vitest";

describe("Health", () => {
  test("should initialize with 30 points", () => {
    const health = new Health();
    expect(health.points).toBe(30);
  })
})

export class Health {
  get points(): number {
    return 30;
  }
}