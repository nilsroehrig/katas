import {describe, expect, test} from "vitest";
import {Health} from "./domain/Health";

describe("ManaSlot", () => {
  test("should initialize in empty state", () => {
    const manaSlot = new ManaSlot();
    expect(manaSlot.empty).toBe(true);
  })
})

class ManaSlot {
  get empty(): boolean {
    return true;
  }
}