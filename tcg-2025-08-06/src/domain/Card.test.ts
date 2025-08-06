import {describe, expect, test} from "vitest";
import {Player} from "./Player";
import {Card} from "./Card";
import {Deck} from "./Deck";

describe("Card", () => {
  test("should deal the proper amount of damage", () => {
    const card = new Card({amount: 5});
    const player = new Player();

    card.deal_damage(player);

    expect(player.remaining_health).toBe(25);
  })
});

