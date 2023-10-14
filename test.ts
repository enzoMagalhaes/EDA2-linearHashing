import LinearHashing from "./LinearHashing";

const test_ps = [1, 5, 10, 20, 50];
const test_alphas = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generate_keys(p: number, min: number = 1, max: number = 10000) {
  const keys: number[] = [];
  for (let i = 0; i < p * 1000; i++) {
    keys.push(getRandomInt(min, max));
  }
  return keys;
}

for (var p of test_ps) {
  for (var alpha of test_alphas) {
    const linearHashing = new LinearHashing(p, alpha);
    const keys = generate_keys(p);

    for (let i = 0; i < keys.length; i++) {
      try {
        linearHashing.insert(keys[i]);
      } catch {
        for (let i = 0; i < keys.length; i++) {
          console.log(keys[i]);
        }
        throw Error("error");
      }
    }
  }
}
