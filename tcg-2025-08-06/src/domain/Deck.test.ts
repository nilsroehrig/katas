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

  test("should take a random card from the deck", () => {
    let cards = [
      new Card({amount: 0}),
      new Card({amount: 4}),
      new Card({amount: 8}),
    ];

    const deck = new Deck([...cards]);

    const random_card = deck.take_random_card();
    expect(cards).toContain(random_card);
    expect(deck.remaining_cards).toBe(2);
    expect(deck.max_cards).toBe(3);
  })
})

class Deck {
  private readonly _max_cards: number;

  constructor(private _cards: Card[]) {
    this._max_cards = _cards.length;
  }

  get max_cards(): number {
    return this._max_cards;
  }

  get remaining_cards(): number {
    return this._cards.length;
  }

  take_random_card() {
    const random_index = Math.floor(Math.random() * this._cards.length);
    return this._cards.splice(random_index, 1)[0];
  }
}