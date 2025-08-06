import {describe, expect, test} from "vitest";
import {Player} from "./Player";


describe("Player", () => {
  test("should increase mana slots when mana slot is received", () => {
    const player = new Player();
    player.receive_mana_slot();
    expect(player.max_mana).toBe(1);
  })

  test("should not receive more than 10 mana slots", () => {
    const player = new Player();
    for (let i = 0; i < 10; i++) {
      player.receive_mana_slot();
    }

    expect(player.max_mana).toBe(10);

    player.receive_mana_slot();

    expect(player.max_mana).toBe(10);
  })

  test("should refill empty mana slots", () => {
    const player = new Player();

    for (let i = 0; i < 10; i++) {
      player.receive_mana_slot();
    }

    expect(player.available_mana).toBe(0);

    player.regenerate_mana();

    expect(player.available_mana).toBe(10);
  })

  test("should start with 30 health points", () => {
    const player = new Player();
    expect(player.max_health).toBe(30);
    expect(player.remaining_health).toBe(30);
  })

  test("should lose health points to the amount of damage taken", () => {
    const player = new Player();
    player.take_damage({amount: 10});
    expect(player.remaining_health).toBe(20);
  })
});

