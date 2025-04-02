interface Cake {
  readonly type: "cake";
  name: () => string;
  cost: () => number;
  price: () => string;
}

interface Topping {
  readonly type: "topping";
  name: () => string;
  cost: () => number;
}

type CakeTopper = (topping: Topping) => (cake: Cake) => Cake;

export const Cupcake = createCakeFactory("🧁", 1);
export const Cookie = createCakeFactory("🍪", 2);

function createCakeFactory(name: string, cost: number) {
  return function () {
    return {
      type: "cake",
      name: () => name,
      cost: () => cost,
      price: () => `${cost}€`,
    };
  };
}
