import {Player} from "./Player";
import {Card} from "./Card";

export class Game {
  private _active_player: Player;
  private _opponent_player: Player;

  constructor(
    initial_active_player: Player,
    initial_opponent_player: Player,
    private _on_game_over = (winner: Player, loser: Player) => {
    }
  ) {
    this._active_player = initial_active_player;
    this._opponent_player = initial_opponent_player;
    this._active_player.connect_to_game(this);
    this._opponent_player.connect_to_game(this);
  }

  end_turn(): void {
    const next_active_player = this._opponent_player;
    this._opponent_player = this._active_player;
    this._active_player = next_active_player;

    this._active_player.draw_card();

    this.choose_winner();
  }

  choose_winner(): Player | null {
    if (this.active_player.remaining_health <= 0) {
      this._on_game_over(this.opponent_player, this.active_player);
      return this.opponent_player;
    }
    if (this.opponent_player.remaining_health <= 0) {
      this._on_game_over(this.active_player, this.opponent_player);
      return this._active_player;
    }
    return null;
  }

  execute_card(card: Card) {
    card.deal_damage(this._opponent_player);
    this.choose_winner()
  }

  get active_player(): Player {
    return this._active_player;
  }

  get opponent_player(): Player {
    return this._opponent_player;
  }
}