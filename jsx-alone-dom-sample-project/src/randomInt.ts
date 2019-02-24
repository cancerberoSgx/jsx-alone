export function randomInt(a: number, b: number) {
  return Math.floor(Math.random() * b) + a;
}
export function array<T = number>(n: number, sample?: T): T[] {
  const a: (T | number)[] = [];
  for (let i = 0; i < n; i++) {
    a.push(typeof sample === 'undefined' ? i : sample);
  }
  return a as T[];
}
