import {describe, expect, test} from "vitest";

describe('Hand', () => {
  test("it should initialize with an empty hand", () => {
    const hand = new Hand();
    expect(hand.show()).toHaveLength(0);
  })
})

export class Hand {
  private _cards: Card[] = [];

  show(): Card[] {
    return [...this._cards];
  }
}