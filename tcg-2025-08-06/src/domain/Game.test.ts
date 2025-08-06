import {describe, expect, test} from "vitest";
import {Player} from "./Player";
import {Deck} from "./Deck";

describe("Game", () => {
  test("should initialize a new game", () => {
    const player1 = new Player(Deck.get_default_deck())
    const player2 = new Player(Deck.get_default_deck())
    const game = new Game(player1, player2);
    expect(game.active_player).toBe(player1);
    expect(game.opponent_player).toBe(player2);
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

  get active_player(): Player {
    return this._active_player;
  }

  get opponent_player(): Player {
    return this._opponent_player;
  }
}