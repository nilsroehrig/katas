import {Card} from "./Card";

export class Deck {
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