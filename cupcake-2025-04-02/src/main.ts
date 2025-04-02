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

export function Cupcake(): Cake {
  const cost = 1;

  return {
    type: "cake",
    name: () => "🧁",
    cost: () => cost,
    price: () => `${cost}€`,
  };
}
