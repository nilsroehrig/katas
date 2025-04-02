import { expect, test } from "vitest";
import { main } from "./main";

test("it should work", () => {
  expect(() => main()).not.toThrowError();
});
