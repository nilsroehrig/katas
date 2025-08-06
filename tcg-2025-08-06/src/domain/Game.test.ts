import {describe, expect, test} from "vitest";
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
})

class Game {
  private _active_player: Player;
  private _opponent_player: Player;

  constructor(
    initial_active_player: Player,
    initial_opponent_player: Player
  ) {
    this._active_player = initial_active_player;
    this._opponent_player = initial_opponent_player;
  }

  end_turn(): void {
    const next_active_player = this._opponent_player;
    this._opponent_player = this._active_player;
    this._active_player = next_active_player;
  }

  get active_player(): Player {
    return this._active_player;
  }

  get opponent_player(): Player {
    return this._opponent_player;
  }
}