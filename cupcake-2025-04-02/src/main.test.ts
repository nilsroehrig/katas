import { expect, test } from "vitest";
import { BuildBundle, Chocolate, Cookie, Cupcake, Peanut } from "./main";

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

test("can top a Cookie with multiple toppings", () => {
  const cupcakeWithChocolateAndPeanut = Peanut(Chocolate(Cookie()));
  expect(cupcakeWithChocolateAndPeanut.name()).toBe("🍪 with 🍫 and 🥜");
  expect(cupcakeWithChocolateAndPeanut.price()).toBe("2.30€");
});

test("order of Cupcake toppings is preserved, price stays the same", () => {
  const cupcakeWithChocolateAndPeanut = Chocolate(Peanut(Cupcake()));
  expect(cupcakeWithChocolateAndPeanut.name()).toBe("🧁 with 🥜 and 🍫");
  expect(cupcakeWithChocolateAndPeanut.price()).toBe("1.30€");
});

test("order of Cookie toppings is preserved, price stays the same", () => {
  const cupcakeWithChocolateAndPeanut = Chocolate(Peanut(Cookie()));
  expect(cupcakeWithChocolateAndPeanut.name()).toBe("🍪 with 🥜 and 🍫");
  expect(cupcakeWithChocolateAndPeanut.price()).toBe("2.30€");
});

test("can build a bundle with 1 cupcake", () => {
  const bundle = BuildBundle(Cupcake());

  expect(bundle.description()).toBe("🧁");
  expect(bundle.price()).toBe("0.90€");
});

test("can build a bundle with cupcake and 1 cookie", () => {
  const bundle = BuildBundle(Cupcake(), Cookie());

  expect(bundle.description()).toBe("🧁,🍪");
  expect(bundle.price()).toBe("2.70€");
});

test("can build a bundle with 2 cupcakes and 1 cookie", () => {
  const bundle = BuildBundle(Cupcake(), Cupcake(), Cookie());
  expect(bundle.description()).toBe("🧁,🧁,🍪");
  expect(bundle.price()).toBe("3.60€");
});

test("can build a bundle with 1 bundle of 2 cakes and 1 cupcake", () => {
  const bundle = BuildBundle(BuildBundle(Cupcake(), Cookie()), Cupcake());
  expect(bundle.description()).toBe("(🧁,🍪),🧁");
  expect(bundle.price()).toBe("3.33€");
});

test("can build a bundle with many bundles of bundles and many cakes", () => {
  const bundleOfBundles = BuildBundle(
    BuildBundle(Peanut(Chocolate(Cookie())), Chocolate(Peanut(Cupcake()))),
    BuildBundle(Cupcake(), Chocolate(Cookie())),
  );

  const bundleOfCakes = BuildBundle(Peanut(Cupcake()), Cookie());

  const bundleOfManyThings = BuildBundle(
    Peanut(Cupcake()),
    bundleOfBundles,
    bundleOfCakes,
  );

  expect(bundleOfManyThings.description()).toBe(
    "🧁 with 🥜,((🍪 with 🍫 and 🥜,🧁 with 🥜 and 🍫),(🧁,🍪 with 🍫)),(🧁 with 🥜,🍪)",
  );
  expect(bundleOfManyThings.price()).toBe("8.55€");
});
