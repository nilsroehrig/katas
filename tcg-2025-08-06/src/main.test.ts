import {describe, expect, test} from "vitest";
import {ManaSlot} from "./domain/ManaSlot";

describe("Player", () => {
  test("should increase mana slots when mana slot is received", () => {
    const player = new Player();
    player.receive_mana_slot();
    expect(player.mana_slots).toHaveLength(1);
  })

  test("should not receive more than 10 mana slots", () => {
    const player = new Player();
    for (let i = 0; i < 10; i++) {
      player.receive_mana_slot();
    }

    expect(player.mana_slots).toHaveLength(10);

    player.receive_mana_slot();

    expect(player.mana_slots).toHaveLength(10);
  })
});

class Player {
  private _mana_slots: ManaSlot[] = [];

  receive_mana_slot(): void {
    if (this._mana_slots.length >= 10) {
      return;
    }
    this._mana_slots.push(new ManaSlot());
  }

  get mana_slots () {
    return this._mana_slots;
  }
}