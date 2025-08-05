import {describe, expect, test} from "vitest";
import {ManaSlot} from "./ManaSlot";

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

  test("should be empty after a filled slot is used", () => {
    const mana_slot = new ManaSlot();
    mana_slot.refill();
    mana_slot.use();
    expect(mana_slot.empty).toBe(true);
  })
})