import {describe, expect, test} from "vitest";
import {Card} from "./Card";

describe('Hand', () => {
  test("it should initialize with an empty hand", () => {
    const hand = new Hand();
    expect(hand.show()).toHaveLength(0);
  })

  test("should contain a card after it's added", () => {
    const card = new Card({amount: 0})
    const hand = new Hand();
    hand.add_card(card);
    expect(hand.show()).toHaveLength(1);
    expect(hand.show()).toContain(card);
  })

  test("should not contain more then 5 cards", () => {
    const hand = new Hand();
    for (let i = 0; i < 5; i++) {
      const card = new Card({amount: i});
      hand.add_card(card);
    }
    expect(hand.show()).toHaveLength(5);

    expect(() => hand.add_card(new Card({amount: 5}))).toThrow(HandOutOfBoundsError);
  })
})

export class Hand {
  private _cards: Card[] = [];

  show(): Card[] {
    return [...this._cards];
  }

  add_card(card: Card) {
    if(this._cards.length >= 5) {
      throw new HandOutOfBoundsError("Cannot add more than 5 cards to the hand");
    }
    this._cards.push(card);
  }
}

class HandOutOfBoundsError extends Error {
  constructor(message: string = "Hand cannot contain more than 5 cards", options?: ErrorOptions) {
    super(message, options);
    this.name = "HandOutOfBoundsError";
  }
}