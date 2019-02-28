# jsx-alone-sample-project-cli-runner

runs examples in sample-code in the CLI, without jest, to measure performance of both impls. The idea is to be able to compare how code changes affect performance of an implementation and also to compare two implementations that compete in the same ground.

```
ts-node src/cli.ts --sample  lotsOfPeopleDom --n 1000,2000 --m 10,20 --runs 5
```

it will generate a log file with each combination of run times, current git commit hash and totaltime.