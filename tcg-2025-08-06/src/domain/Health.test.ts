import {describe, expect, test} from "vitest";
import {Health} from "./Health";

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