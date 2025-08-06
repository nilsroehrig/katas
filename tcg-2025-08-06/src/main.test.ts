import {describe, expect, test} from "vitest";
import {ManaSlot} from "./domain/ManaSlot";
import {Health} from "./domain/Health";

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

  test("should refill empty mana slots", () => {
    const player = new Player();

    for (let i = 0; i < 10; i++) {
      player.receive_mana_slot();
    }

    player.regenerate_mana();

    player.mana_slots.forEach(slot => expect(slot.empty).toBe(false))
  })

  test("should start with 30 health points", () => {
    const player = new Player();
    expect(player.health.points).toBe(30);
  })

  test("should lose health points to the amount of damage taken", () => {
    const player = new Player();
    player.take_damage({amount: 10});
    expect(player.health.points).toBe(20);
  })
});

type Damage = { amount: number };

class Player {
  private _mana_slots: ManaSlot[] = [];
  private _health = new Health()

  receive_mana_slot(): void {
    if (this._mana_slots.length >= 10) {
      return;
    }
    this._mana_slots.push(new ManaSlot());
  }

  regenerate_mana(): void {
    this._mana_slots.forEach(slot => slot.refill());
  }

  take_damage(damage: Damage): void {
    this._health.decrease(damage.amount);
  }

  get mana_slots() {
    return this._mana_slots;
  }

  get health() {
    return this._health;
  }
}