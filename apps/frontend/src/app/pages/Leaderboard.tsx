import { Header } from '@levi-math/components';
import { useGetScoresQuery } from '@levi-math/gql';
import classNames from 'classnames';
import { useMemo } from 'react';

export const Leaderboard = () => {
  const { data } = useGetScoresQuery({
    fetchPolicy: 'cache-and-network',
  });

  const bgColorMap = useMemo(
    () => [
      'bg-gradient-to-r from-amber-400 to-amber-500',
      'bg-gradient-to-r from-gray-300 to-gray-400',
      'bg-gradient-to-r from-amber-600 to-amber-700',
    ],
    []
  );

  return (
    <main className="w-full">
      <Header />
      <h1 className="mb-8 mt-4 text-center text-4xl font-bold">Leaderboard</h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 text-center shadow-lg">
          <div className="grid grid-cols-4">
            <div className="bg-white p-4 text-xl font-bold">Rank</div>
            <div className="bg-white p-4 text-xl font-bold">Name</div>
            <div className="bg-white p-4 text-xl font-bold">Score</div>
            <div className="bg-white p-4 text-xl font-bold">Date</div>
          </div>
          {data?.allScores.map(({ date, id, name, score }, index) => (
            <div
              key={id}
              className={classNames('grid grid-cols-4', bgColorMap[index])}
            >
              <div className={'p-4 font-semibold'}>{index + 1}</div>
              <div className={'p-4 font-semibold'}>{name}</div>
              <div className={'p-4 font-semibold'}>{score}</div>
              <div className={'p-4 font-semibold'}>{date.toFormat('DD')}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
