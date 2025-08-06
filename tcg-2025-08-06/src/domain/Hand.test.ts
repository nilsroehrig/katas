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
})

export class Hand {
  private _cards: Card[] = [];

  show(): Card[] {
    return [...this._cards];
  }

  add_card(card: Card) {
    this._cards.push(card);
  }
}