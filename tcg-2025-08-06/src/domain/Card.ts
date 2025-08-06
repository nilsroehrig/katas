import {Damage} from "./Damage";
import {Player} from "./Player";

export class Card {
  constructor(private _damage: Damage) {}

  deal_damage(player: Player): void {
    player.take_damage(this._damage);
  }
}