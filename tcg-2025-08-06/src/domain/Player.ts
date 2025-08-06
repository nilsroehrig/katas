import {ManaSlot} from "./ManaSlot";
import {Health} from "./Health";
import {Damage} from "./Damage";

export class Player {
  private readonly _max_health: number;

  constructor(private _mana_slots: ManaSlot[] = [],
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