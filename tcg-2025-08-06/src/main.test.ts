import {describe, expect, test} from "vitest";
import {Health} from "./domain/Health";

describe("ManaSlot", () => {
  test("should initialize in empty state", () => {
    const mana_slot = new ManaSlot();
    expect(mana_slot.empty).toBe(true);
  })
  test("should not be empty after refill", () => {
    const mana_slot = new ManaSlot();
    mana_slot.refill();
    expect(mana_slot.empty).toBe(false);
  })
})

class ManaSlot {
  private _empty = true;

  refill(): void {
    this._empty = false;
  }

  get empty(): boolean {
    return this._empty;
  }
}