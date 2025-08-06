import {describe, expect, test, vi} from "vitest";
import {Player} from "./Player";
import {Deck} from "./Deck";

describe("Game", () => {
  test("should initialize a new game", () => {
    const player1 = new Player()
    const player2 = new Player()
    const game = new Game(player1, player2);
    expect(game.active_player).toBe(player1);
    expect(game.opponent_player).toBe(player2);
  })

  test("should switch active player when turn ends", () => {
    const player1 = new Player()
    const player2 = new Player()
    const game = new Game(player1, player2);

    game.end_turn();

    expect(game.active_player).toBe(player2);
    expect(game.opponent_player).toBe(player1);
  })

  test("should declared the opponent player as winner when the active placer bleeds out", () => {
    const winning_layer = new Player();
    const losing_player = new Player();

    losing_player.take_damage({amount: 29});

    const on_game_over = vi.fn();

    const game = new Game(winning_layer, losing_player, on_game_over);

    game.end_turn();

    expect(on_game_over).toHaveBeenCalledWith(winning_layer, losing_player);
  })
})

class Game {
  private _active_player: Player;
  private _opponent_player: Player;

  constructor(
    initial_active_player: Player,
    initial_opponent_player: Player,
    private _on_game_over = (winner: Player, loser: Player) => {}
  ) {
    this._active_player = initial_active_player;
    this._opponent_player = initial_opponent_player;
  }

  end_turn(): void {
    const next_active_player = this._opponent_player;
    this._opponent_player = this._active_player;
    this._active_player = next_active_player;

    this._active_player.draw_card();

    switch(this.choose_winner()) {
      case this.active_player:
        this._on_game_over(this.active_player, this.opponent_player);
        break;
      case this.opponent_player:
        this._on_game_over(this.opponent_player, this.active_player);
        break;
    }
  }

  choose_winner(): Player | null {
    if (this.active_player.remaining_health <= 0) {
      return this.opponent_player;
    }
    if (this.opponent_player.remaining_health <= 0) {
      return this.active_player;
    }
    return null;
  }

  get active_player(): Player {
    return this._active_player;
  }

  get opponent_player(): Player {
    return this._opponent_player;
  }
}