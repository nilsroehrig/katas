import { expect, test } from "vitest";
import { Cupcake } from "./main";

test("it should create a cupcake", () => {
  const cupcake = Cupcake();

  expect(cupcake.type).toBe("cake");
  expect(cupcake.name()).toBe("🧁");
  expect(cupcake.price()).toBe("1€");
});
