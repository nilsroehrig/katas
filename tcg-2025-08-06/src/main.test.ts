import {describe, expect, test} from "vitest";
import {ManaSlot} from "./domain/ManaSlot";

describe.todo("Player", () => {
  test("should increase mana slots when mana slot is received", () => {
    const player = new Player();
    player.receive_mana_slot();
    expect(player.mana_slots).toHaveLength(1);
  })
});

class Player {
  private _mana_slots: ManaSlot[] = [];

  receive_mana_slot(): void {
    this._mana_slots.push(new ManaSlot());
  }

  get mana_slots () {
    return Object.freeze(this._mana_slots);
  }
}



