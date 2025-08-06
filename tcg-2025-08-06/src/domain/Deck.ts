import {Card} from "./Card";

export class Deck {
  static get_default_deck() {
    const damageAmountToCardAmountDict: Record<number, number> = {
      0: 2,
      1: 2,
      2: 3,
      3: 4,
      4: 3,
      5: 2,
      6: 2,
      7: 1,
      8: 1,
    };

    const cards: Card[] = [];

    for(let i = 0; i <=8; i++) {
      const amount = damageAmountToCardAmountDict[i];
      for(let j = 0; j < amount; j++) {
        cards.push(new Card({amount: i}))
      }
    }

    return new Deck(cards);
  }

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
    if(!this._cards.length) {
      throw new Error("Cannot take a card from an empty deck");
    }
    const random_index = Math.floor(Math.random() * this._cards.length);
    return this._cards.splice(random_index, 1)[0];
  }
}