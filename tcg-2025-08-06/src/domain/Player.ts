import {ManaSlot} from "./ManaSlot";
import {Health} from "./Health";
import {Damage} from "./Damage";
import {Card} from "./Card";
import {Deck} from "./Deck";
import {Hand} from "./Hand";

export class Player {
  private readonly _max_health: number;

  constructor(
    private _deck: Deck = new Deck([]),
    private _hand: Hand = new Hand(),
    private _mana_slots: ManaSlot[] = [],
    private _health: Health = new Health()) {

    this._max_health = this._health.points;
  }

  receive_mana_slot(): void {
    if (this._mana_slots.length >= 10) {
      return;
    }
    this._mana_slots.push(new ManaSlot());
  }

  regenerate_mana(): void {
    this._mana_slots.forEach(slot => slot.refill());
  }

  take_damage(damage: Damage): void {
    this._health.decrease(damage.amount);
  }

  draw_card(): void {
    let card: Card;
    try {
      card = this._deck.take_random_card();
    } catch(_: unknown) {
      return this._health.decrease(1);
    }

    this._hand.add_card(card);
  }

  show_hand(): Card[] {
    return this._hand.show()
  }

  get max_mana(): number {
    return this._mana_slots.length;
  }

  get available_mana(): number {
    return this._mana_slots.filter(slot => !slot.empty).length;
  }

  get max_health() {
    return this._max_health;
  }

  get remaining_health() {
    return this._health.points;
  }
}