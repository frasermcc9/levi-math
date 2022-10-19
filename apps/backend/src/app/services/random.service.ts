import { Tuple } from '@levi-math/common';
import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { create } from 'random-seed';

@Injectable()
export class RandomService {
  randomDateSeeded<T extends number>(
    count: T | number = 1,
    forDate = DateTime.now()
  ): Tuple<number, T> {
    const { day, month, year } = forDate;
    const base = DateTime.fromObject({ day, month, year });

    const randomDateSeed = create(base.toMillis() + '');

    return new Array(count).fill(0).map(() => randomDateSeed.random()) as Tuple<
      number,
      T
    >;
  }

  getGenerator(forDate = DateTime.now()) {
    const { day, month, year } = forDate;
    const base = DateTime.fromObject({ day, month, year });

    return create(base.toMillis() + '');
  }
}
