import { expect, test } from "vitest";
import { Chocolate, Cookie, Cupcake } from "./main";

test("can create a cupcake", () => {
  const cupcake = Cupcake();

  expect(cupcake.name()).toBe("🧁");
  expect(cupcake.price()).toBe("1.00€");
});

test("can create a cookie", () => {
  const cookie = Cookie();

  expect(cookie.name()).toBe("🍪");
  expect(cookie.price()).toBe("2.00€");
});

test("can top a Cupcake", () => {
  const cupcakeWithChocolate = Chocolate(Cupcake());

  expect(cupcakeWithChocolate.name()).toBe("🧁 with 🍫");
  expect(cupcakeWithChocolate.price()).toBe("1.10€");
});
