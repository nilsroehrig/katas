import { expect, test } from "vitest";
import { Chocolate, Cookie, Cupcake, Peanut } from "./main";

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

test("can top a Cookie", () => {
  const cupcakeWithChocolate = Chocolate(Cookie());

  expect(cupcakeWithChocolate.name()).toBe("🍪 with 🍫");
  expect(cupcakeWithChocolate.price()).toBe("2.10€");
});

test("can top a Cupcake with multiple toppings", () => {
  const cupcakeWithChocolateAndPeanut = Peanut(Chocolate(Cupcake()));
  expect(cupcakeWithChocolateAndPeanut.name()).toBe("🧁 with 🍫 and 🥜");
  expect(cupcakeWithChocolateAndPeanut.price()).toBe("1.30€");
});
