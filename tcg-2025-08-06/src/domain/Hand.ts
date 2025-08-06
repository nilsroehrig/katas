import {Card} from "./Card";

export class Hand {
  private _cards: Card[] = [];

  show(): Card[] {
    return [...this._cards];
  }

  add_card(card: Card): void {
    if (this._cards.length >= 5) {
      throw new Error("Cannot add more than 5 cards to the hand");
    }
    this._cards.push(card);
  }

  take_card(card: Card): Card {
    const index = this._cards.indexOf(card);
    if (index === -1) {
      throw new Error("Cannot take a card that is not in the hand");
    }
    return this._cards.splice(index, 1)[0];
  }
}