interface Cake {
  name: () => string;
  cost: () => number;
  price: () => string;
}

interface Topping {
  name: string;
  cost: number;
}

type CakeTopper = (cake: Cake) => Cake;

export const Cupcake = createCakeFactory("🧁", 100);
export const Cookie = createCakeFactory("🍪", 200);

export const Chocolate = createCakeTopper({
  name: "🍫",
  cost: 10,
});

function createCakeFactory(name: string, cost: number) {
  return function () {
    return {
      name: () => name,
      cost: () => cost,
      price: () => `${(cost / 100).toFixed(2)}€`,
    };
  };
}

function createCakeTopper(topping: Topping): CakeTopper {
  return (cake) => ({
    name: () => `${cake.name()} with ${topping.name}`,
    cost: () => cake.cost() + topping.cost,
    price: () => `${((cake.cost() + topping.cost) / 100).toFixed(2)}€`,
  });
}
