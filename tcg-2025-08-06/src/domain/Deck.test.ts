import {describe, expect, test} from "vitest";
import {Card} from "./Card";

describe("Deck", () => {
  test("should initialize with the provided cards", () => {
    const deck = new Deck([
      new Card({amount: 0}),
      new Card({amount: 4}),
      new Card({amount: 8}),
    ]);
    expect(deck.max_cards).toBe(3);
    expect(deck.remaining_cards).toBe(3);
  })
})

class Deck {
  private readonly _max_cards: number;

  constructor(private _cards: Card[]) {
    this._max_cards = _cards.length;
  }

  get max_cards(): number {
    return this._cards.length;
  }

  get remaining_cards(): number {
    return this._cards.length;
  }
}