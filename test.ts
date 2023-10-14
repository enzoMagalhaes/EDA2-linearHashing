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

function round(number:number){
  return Math.round(number * 100) / 100
}

function avg(numbers: number[]) {
  const sum = numbers.reduce((acc, currentValue) => acc + currentValue, 0);
  return round(sum / numbers.length);
}

for (var p of test_ps) {
  for (var alpha of test_alphas) {
    const alphas: number[] = [];
    const pStars: number[] = [];

    for (let i = 0; i < 10; i++) {
      const linearHashing = new LinearHashing(p, alpha);
      const keys = generate_keys(p);
      for (let i = 0; i < keys.length; i++) {
        linearHashing.insert(keys[i]);
      }

      alphas.push(linearHashing.alpha);
      pStars.push(linearHashing.pStar);
    }

    console.log(
      `CONFIG: {p: ${p}, maxAlpha: ${alpha}} \naverage alpha: ${avg(
        alphas
      )} alphas: ${alphas}\naverage p*: ${avg(pStars)} p*s: ${pStars}`
    );
  }
}
