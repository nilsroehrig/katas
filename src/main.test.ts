import { beforeEach, describe, expect, test } from "vitest";

type RollValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type BasicRoll = { type: "roll"; value: RollValue };
type StrikeRoll = { type: "strike-roll"; value: 10 };
type Roll = BasicRoll | StrikeRoll;

type PartialFrame = { type: "partial"; rolls: [Roll] };
type BasicFrame = { type: "basic"; rolls: [Roll, Roll] };
type Spare = { type: "spare"; rolls: [Roll, Roll] };
type Strike = { type: "strike"; rolls: [StrikeRoll] };
type FinalStrike = {
  type: "final-strike";
  rolls: [StrikeRoll, Roll] | [StrikeRoll, StrikeRoll, Roll];
};
type FinalSpare = {
  type: "final-spare";
  rolls: [Roll, Roll, Roll] | [Roll, Roll, StrikeRoll];
};

type Frame =
  | PartialFrame
  | BasicFrame
  | Spare
  | Strike
  | FinalStrike
  | FinalSpare;

type Game = { frames: Frame[] };

function roll(game: Game, rollValue: RollValue): Game {
  const [latestFrame, ...previousFrames] = game.frames.toReversed();
  let currentRoll = makeRoll(rollValue);

  if (latestFrame?.type === "partial") {
    return {
      frames: [makeFrame([...latestFrame.rolls, currentRoll])],
    };
  } else if (["basic", "spare", "strike"].includes(latestFrame?.type)) {
    return {
      frames: [
        ...previousFrames.toReversed(),
        latestFrame,
        makeFrame([currentRoll]),
      ],
    };
  }

  return {
    frames: [makeFrame([currentRoll])],
  };
}

function score(game: Game): number {
  throw new Error("not implemented");
}

function makeRoll(value: RollValue): Roll {
  if (value === 10) {
    return { type: "strike-roll", value };
  }

  return { type: "roll", value };
}

function makeFrame(rolls: Frame["rolls"]): Frame {
  const [firstRoll, secondRoll] = rolls;
  if (firstRoll.type === "strike-roll") {
    return { type: "strike", rolls: [firstRoll] };
  }

  if (!secondRoll) {
    return { type: "partial", rolls: [firstRoll] };
  }

  if (firstRoll.value + secondRoll.value === 10) {
    return { type: "spare", rolls: [firstRoll, secondRoll] };
  }

  return { type: "basic", rolls: [firstRoll, secondRoll] };
}

describe("roll", () => {
  let game: Game;

  beforeEach(() => (game = { frames: [] }));

  test("adds a partial frame on non-strike roll", () => {
    const nextGame = roll(game, 0);
    expect(nextGame.frames).toEqual([
      { type: "partial", rolls: [makeRoll(0)] },
    ]);
  });

  test("completes a partial frame on second roll", () => {
    const firstRoll = makeRoll(0);

    game.frames.push(makeFrame([firstRoll]));

    const nextGame = roll(game, 1);

    expect(nextGame.frames).toEqual([
      { type: "basic", rolls: [firstRoll, makeRoll(1)] } as Frame,
    ]);
  });

  test("starts a new partial frame after a basic frame", () => {
    const firstFrame = makeFrame([makeRoll(0), makeRoll(1)]);
    game.frames.push(firstFrame);

    const nextGame = roll(game, 5);

    expect(nextGame.frames).toEqual([
      firstFrame,
      { type: "partial", rolls: [makeRoll(5)] },
    ]);
  });

  test("completes a spare frame on second roll", () => {
    const firstRoll = makeRoll(0);
    game.frames.push(makeFrame([firstRoll]));

    const nextGame = roll(game, 10);

    expect(nextGame.frames).toEqual([
      { type: "spare", rolls: [firstRoll, makeRoll(10)] } as Frame,
    ]);
  });

  test("adds a strike frame on first roll", () => {
    const nextGame = roll(game, 10);
    expect(nextGame.frames).toEqual([
      { type: "strike", rolls: [{ type: "strike-roll", value: 10 }] } as Frame,
    ]);
  });

  test("starts a new partial frame after a strike frame", () => {
    const strikeFrame = makeFrame([makeRoll(10)]);
    game.frames.push(strikeFrame);

    const nextGame = roll(game, 5);

    expect(nextGame.frames).toEqual([
      strikeFrame,
      { type: "partial", rolls: [makeRoll(5)] },
    ]);
  });

  test("starts a new partial frame after a spare frame", () => {
    const spareFrame = makeFrame([makeRoll(0), makeRoll(10)]);
    game.frames.push(spareFrame);

    const nextGame = roll(game, 0);

    expect(nextGame.frames).toEqual([
      spareFrame,
      { type: "partial", rolls: [makeRoll(0)] },
    ]);
  });

  test("starts a new partial frame after two basic frames", () => {
    const firstFrame = makeFrame([makeRoll(5), makeRoll(4)]);
    const secondFrame = makeFrame([makeRoll(3), makeRoll(1)]);

    game.frames = [firstFrame, secondFrame];

    const nextGame = roll(game, 2);

    expect(nextGame.frames).toEqual([
      firstFrame,
      secondFrame,
      { type: "partial", rolls: [makeRoll(2)] },
    ]);
  });
});
