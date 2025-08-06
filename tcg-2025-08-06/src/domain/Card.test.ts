import {describe, expect, test} from "vitest";
import {Player} from "./Player";
import {Damage} from "./Damage";

describe("Card", () => {
  test("should deal the proper amount of damage", () => {
    const card = new Card({amount: 5});
    const player = new Player();

    card.deal_damage(player);

    expect(player.remaining_health).toBe(25);
  })
});

class Card {
  constructor(private _damage: Damage) {}

  deal_damage(player: Player): void {
    player.take_damage(this._damage);
  }
}