export function array<T = number>(n: number, sample?: T): T[] {
  const a: (T | number)[] = [];
  for (let i = 0; i < n; i++) {
    a.push(typeof sample === 'undefined' ? i : sample);
  }
  return a as T[];
}

export function printMs(ms: number, config: {
  minutes?: boolean;
  seconds?: boolean;
  ms?: boolean;
} = { minutes: false, seconds: true, ms: true }) {
  config = { ...{ minutes: false, seconds: true, ms: true }, ...config };
  const seconds = config.seconds && Math.floor(ms / 1000);
  const minutes = config.minutes && seconds && Math.floor(seconds / 60);
  const milliseconds = config.ms && Math.floor(ms % 1000 || ms);
  return `${minutes ? `${minutes} minutes ` : ''}${seconds ? `${seconds} seconds ` : ''}${milliseconds ? `${milliseconds} milliseconds ` : ''}`;
}
