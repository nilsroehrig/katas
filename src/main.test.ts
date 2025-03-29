import {beforeEach, describe, expect, test} from "vitest";

type RollValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
type BasicRoll = { type: "roll", value: RollValue };
type StrikeRoll = { type: "strike-roll", value: 10 }
type Roll = BasicRoll | StrikeRoll;

type PartialFrame = { type: "partial", rolls: [Roll] }
type BasicFrame = { type: "basic", rolls: [Roll, Roll] }
type Spare = { type: "spare", rolls: [Roll, Roll] }
type Strike = { type: "strike", rolls: [StrikeRoll] }
type FinalStrike = { type: "final-strike", rolls: [StrikeRoll, Roll] | [StrikeRoll, StrikeRoll, Roll] }
type FinalSpare = { type: "final-spare", rolls: [Roll, Roll, Roll] | [Roll, Roll, StrikeRoll] }

type Frame = PartialFrame | BasicFrame | Spare | Strike | FinalStrike | FinalSpare;

type Game = { frames: Frame[] }

function roll(game: Game, rollValue: RollValue): Game {
  return {
    frames: [makeFrame([makeRoll(rollValue)])]
  }
}

function score(game: Game): number {
  throw new Error("not implemented");
}

function makeRoll(value: RollValue): Roll {
  if (value === 10) {
    return {type: "strike-roll", value}
  }
  return {type: "roll", value}
}

function makeFrame(rolls: Frame["rolls"]): Frame {
  return {type: "partial", rolls} as PartialFrame
}

describe("roll", () => {
  let game: Game;

  beforeEach(() => game = {frames: []})

  test('adds a partial frame on non-strike roll', () => {
    const nextGame = roll(game, 0);
    expect(nextGame.frames).toEqual([{type: "partial", rolls: [makeRoll(0)]}])
  })
})