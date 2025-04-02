import { expect, test } from "vitest";
import { Cookie, Cupcake } from "./main";

test("it should create a cupcake", () => {
  const cupcake = Cupcake();

  expect(cupcake.type).toBe("cake");
  expect(cupcake.name()).toBe("🧁");
  expect(cupcake.price()).toBe("1€");
});

test("it can create a cookie", () => {
  const cookie = Cookie();

  expect(cookie.type).toBe("cake");
  expect(cookie.name()).toBe("🍪");
  expect(cookie.price()).toBe("2€");
});
