import { afterEach, beforeEach, describe, expect, test } from "vitest";

type RollValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type BasicRoll = { type: "roll"; value: RollValue };
type StrikeRoll = { type: "strike-roll"; value: 10 };
type Roll = BasicRoll | StrikeRoll;

type PartialFrame = {
  type: "partial";
  rolls: [Roll | StrikeRoll] | [StrikeRoll | Roll, StrikeRoll | Roll];
};
type BasicFrame = { type: "basic"; rolls: [Roll, Roll] };
type Spare = { type: "spare"; rolls: [Roll, Roll] };
type Strike = { type: "strike"; rolls: [StrikeRoll] };
type FinalStrike = {
  type: "final-strike";
  rolls:
    | [StrikeRoll, Roll, Roll]
    | [StrikeRoll, StrikeRoll, Roll]
    | [StrikeRoll, StrikeRoll, StrikeRoll];
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
  let remainingFrames = 10 - game.frames.length;

  if (latestFrame?.type === "partial") {
    return {
      frames: [
        ...previousFrames.toReversed(),
        makeFrame([...latestFrame.rolls, currentRoll], remainingFrames),
      ],
    };
  } else if (["basic", "spare", "strike"].includes(latestFrame?.type)) {
    return {
      frames: [
        ...previousFrames.toReversed(),
        latestFrame,
        makeFrame([currentRoll], remainingFrames),
      ],
    };
  }

  return {
    frames: [makeFrame([currentRoll], remainingFrames)],
  };
}

function makeRoll(value: 10): StrikeRoll;
function makeRoll(value: RollValue): Roll;
function makeRoll(
  value: RollValue,
): typeof value extends 10 ? StrikeRoll : Roll {
  if (value === 10) {
    return { type: "strike-roll", value };
  }

  return { type: "roll", value };
}

function makeFrame(rolls: Frame["rolls"], remainingFrames?: number): Frame {
  const [firstRoll, secondRoll, thirdRoll] = rolls;
  const firstRollIsStrike = firstRoll.type === "strike-roll";
  const lastFrameStarts = remainingFrames === 1;
  const lastFrameRuns = remainingFrames === 0;
  const hasSecondRoll = !!secondRoll;
  const hasThirdRoll = !!thirdRoll;
  const isSpare = firstRoll.value + (secondRoll?.value ?? Infinity) === 10;

  if (lastFrameStarts && firstRollIsStrike) {
    return makePartialFrame([firstRoll]);
  }

  if (lastFrameRuns && firstRollIsStrike && !hasThirdRoll) {
    return makePartialFrame(secondRoll ? [firstRoll, secondRoll] : [firstRoll]);
  }

  if (lastFrameRuns && firstRollIsStrike && hasSecondRoll && hasThirdRoll) {
    return makeFinalStrikeFrame([firstRoll, secondRoll, thirdRoll]);
  }

  if (lastFrameRuns && isSpare && !hasThirdRoll) {
    return makePartialFrame([firstRoll, secondRoll!]);
  }

  if (lastFrameRuns && isSpare && hasThirdRoll) {
    return makeFinalSpareFrame([firstRoll, secondRoll!, thirdRoll]);
  }

  if (firstRollIsStrike) {
    return makeStrike([firstRoll]);
  }

  if (!hasSecondRoll) {
    return makePartialFrame([firstRoll]);
  }

  if (isSpare) {
    return makeSpare([firstRoll, secondRoll]);
  }

  return makeBasic([firstRoll, secondRoll]);
}

function makePartialFrame(rolls: PartialFrame["rolls"]): PartialFrame {
  return { type: "partial", rolls };
}

function makeFinalStrikeFrame(rolls: FinalStrike["rolls"]): FinalStrike {
  return { type: "final-strike", rolls };
}

function makeStrike(rolls: Strike["rolls"]): Strike {
  return { type: "strike", rolls };
}

function makeSpare(rolls: Spare["rolls"]): Spare {
  return { type: "spare", rolls };
}

function makeBasic(rolls: BasicFrame["rolls"]): BasicFrame {
  return { type: "basic", rolls };
}

function makeFinalSpareFrame(rolls: FinalSpare["rolls"]): FinalSpare {
  return { type: "final-spare", rolls };
}

function score(game: Game): number {
  return game.frames.reduce((gameScore, frame, frameIndex) => {
    const lastFrame = game.frames.at(frameIndex - 1);
    const secondToLastFrame = game.frames.at(frameIndex - 2);

    return (
      gameScore +
      frame.rolls.reduce((frameScore, roll, rollIndex) => {
        if (
          secondToLastFrame?.type === "strike" &&
          lastFrame?.type === "strike" &&
          rollIndex === 0
        ) {
          return frameScore + roll.value * 3;
        }

        if (lastFrame?.type === "strike" && rollIndex < 2) {
          return frameScore + roll.value * 2;
        }

        if (lastFrame?.type === "spare" && rollIndex === 0) {
          return frameScore + roll.value * 2;
        }

        return frameScore + roll.value;
      }, 0)
    );
  }, 0);
}

describe("score", () => {
  let game: Game = { frames: [] };

  afterEach(() => {
    game = { frames: [] };
  });

  test("correctly counts a full game of failed rolls", () => {
    for (let i = 0; i < 20; i++) {
      game = roll(game, 0);
    }

    expect(score(game)).toBe(0);
  });

  test("correctly counts a full game of 1 rolls", () => {
    for (let i = 0; i < 20; i++) {
      game = roll(game, 1);
    }

    expect(score(game)).toBe(20);
  });

  test("correctly counts a full game of spares plus 5 extra", () => {
    for (let i = 0; i < 21; i++) {
      game = roll(game, 5);
    }

    expect(score(game)).toBe(150);
  });

  test("correctly counts a full game of strikes", () => {
    for (let i = 0; i < 12; i++) {
      game = roll(game, 10);
    }

    expect(score(game)).toBe(300);
  });

  test("correctly counts a full game with 9 and fail rolls", () => {
    for (let i = 0; i < 20; i++) {
      game = roll(game, i % 2 ? 0 : 9);
    }

    expect(score(game)).toBe(90);
  });

  test("correctly counts a mixed bowling game", () => {
    const rolls: RollValue[] = [
      4, 3, 5, 5, 10, 7, 0, 4, 5, 1, 8, 10, 0, 1, 3, 5, 10, 8, 0,
    ];
    rolls.forEach((rollValue) => {
      game = roll(game, rollValue);
    });

    expect(score(game)).toBe(107);
  });
});

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

  test("starts a new partial frame after two spare frames", () => {
    const firstFrame = makeFrame([makeRoll(5), makeRoll(5)]);
    const secondFrame = makeFrame([makeRoll(3), makeRoll(7)]);

    game.frames = [firstFrame, secondFrame];

    const nextGame = roll(game, 2);

    expect(nextGame.frames).toEqual([
      firstFrame,
      secondFrame,
      { type: "partial", rolls: [makeRoll(2)] },
    ]);
  });

  test("starts a new partial frame after two strike frames", () => {
    const firstFrame = makeFrame([makeRoll(10)]);
    const secondFrame = makeFrame([makeRoll(10)]);

    game.frames = [firstFrame, secondFrame];

    const nextGame = roll(game, 2);

    expect(nextGame.frames).toEqual([
      firstFrame,
      secondFrame,
      { type: "partial", rolls: [makeRoll(2)] },
    ]);
  });

  test("starts a partial frame when last frame is a strike frame", () => {
    const strikeFrame = makeFrame([makeRoll(10)]);
    game.frames = new Array(9).fill(strikeFrame);

    const nextGame = roll(game, 10);

    expect(nextGame.frames).toEqual(
      game.frames.concat({ type: "partial", rolls: [makeRoll(10)] }),
    );
  });

  test("ends the last frame with three rolls, when last frame is a strike frame", () => {
    const strikeFrame = makeFrame([makeRoll(10)]);
    game.frames = new Array(9).fill(strikeFrame);

    let nextGame = roll(game, 10);
    nextGame = roll(nextGame, 5);
    nextGame = roll(nextGame, 4);

    expect(nextGame.frames).toEqual(
      game.frames.concat([
        {
          type: "final-strike",
          rolls: [makeRoll(10), makeRoll(5), makeRoll(4)],
        },
      ]),
    );
  });

  test("ends the last frame with three rolls, when last frame is a spare frame", () => {
    const frame = makeBasic([makeRoll(3), makeRoll(4)]);
    game.frames = new Array(9).fill(frame);

    let nextGame = roll(game, 5);
    nextGame = roll(nextGame, 5);
    nextGame = roll(nextGame, 2);

    expect(nextGame.frames).toEqual(
      game.frames.concat(
        makeFinalSpareFrame([makeRoll(5), makeRoll(5), makeRoll(2)]),
      ),
    );
  });
});
