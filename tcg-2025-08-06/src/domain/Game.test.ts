import {describe, expect, test, vi} from "vitest";
import {Player} from "./Player";
import {Deck} from "./Deck";
import {Card} from "./Card";
import {Hand} from "./Hand";
import {Game} from "./Game";

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

  test("should declare the active player as winner playing a card that brings the opponent's health to 0", () => {
    const winning_card = new Card({amount: 1});
    const winning_hand = new Hand()

    winning_hand.add_card(winning_card)

    const winning_player = new Player(new Deck([]), winning_hand);
    const losing_player = new Player();

    losing_player.take_damage({amount: 29});

    const on_game_over = vi.fn();

    new Game(winning_player, losing_player, on_game_over);

    winning_player.play_card(winning_card);

    expect(on_game_over).toHaveBeenCalledWith(winning_player, losing_player);
  })
})

