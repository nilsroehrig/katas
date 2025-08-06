import {describe, expect, test} from "vitest";
import {Card} from "./Card";
import {Hand} from "./Hand";

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

    expect(() => hand.add_card(new Card({amount: 5}))).toThrowError("Cannot add more than 5 cards to the hand");
  })

  test("should take a card from the hand", () => {
    const hand = new Hand();
    const card = new Card({amount: 0});
    hand.add_card(card);
    const takenCard = hand.take_card(card);
    expect(takenCard).toBe(card);
    expect(hand.show()).toHaveLength(0);
  })

  test("should not take a card that is not in the hand", () => {
    const hand = new Hand();
    const card = new Card({amount: 0});
    expect(() => hand.take_card(card)).toThrowError("Cannot take a card that is not in the hand");
  })
})

