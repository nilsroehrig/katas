import {describe, expect, test} from "vitest";
import {Player} from "./Player";
import {Card} from "./Card";
import {Health} from "./Health";
import {Deck} from "./Deck";

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

  test("should draw a card from the deck to the hand", () => {
    const deck = new Deck([
      new Card({amount: 0})
    ]);

    const player = new Player(deck);

    expect(deck.remaining_cards).toBe(1);
    expect(player.show_hand()).toHaveLength(0);

    player.draw_card();

    expect(deck.remaining_cards).toBe(0);
    expect(player.show_hand()).toHaveLength(1);

  })

  test("takes 1 damage when trying to draw a card from an empty deck", () => {
    const deck = new Deck([]);
    const player = new Player(deck);

    player.draw_card()

    expect(deck.remaining_cards).toBe(0);
    expect(player.show_hand()).toHaveLength(0);
    expect(player.remaining_health).toBe(29);
  })
});

