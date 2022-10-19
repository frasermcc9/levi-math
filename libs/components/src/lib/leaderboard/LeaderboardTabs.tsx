import { Tab } from '@headlessui/react';
import {
  useGetScoresPastDayQuery,
  useGetScoresQuery,
  useGetUniqueScoresQuery,
} from '@levi-math/gql';
import classNames from 'classnames';
import { useMemo } from 'react';

export const LeaderboardTabs = () => {
  const { data: allScoresData } = useGetScoresQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { data: uniqueScoresData } = useGetUniqueScoresQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { data: dailyScoreData } = useGetScoresPastDayQuery({
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

  const categories = useMemo(
    () => ({
      'Best Ever': allScoresData?.allScores,
      'Best Players': uniqueScoresData?.allScoresUniqueUser,
      'Best Daily': dailyScoreData?.allScoresPastDay,
    }),
    [
      allScoresData?.allScores,
      uniqueScoresData?.allScoresUniqueUser,
      dailyScoreData?.allScoresPastDay,
    ]
  );

  return (
    <div className="mx-auto flex max-w-lg flex-col justify-center">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((category, idx) => (
            <Tab.Panel key={idx}>
              <ul>
                <div className="grid grid-cols-1 text-center">
                  <div className="grid grid-cols-4 rounded-t-lg bg-white shadow-lg">
                    <div className="p-4 text-xl font-bold">Rank</div>
                    <div className="p-4 text-xl font-bold">Name</div>
                    <div className="p-4 text-xl font-bold">Score</div>
                    <div className="p-4 text-xl font-bold">Date</div>
                  </div>
                  {category?.map(({ date, id, name, score }, index) => (
                    <div
                      key={id}
                      className={classNames(
                        'grid grid-cols-4',
                        bgColorMap[index],
                        { 'rounded-b-lg': index === category.length - 1 }
                      )}
                    >
                      <div className={'p-4 font-semibold'}>{index + 1}</div>
                      <div className={'p-4 font-semibold'}>{name}</div>
                      <div className={'p-4 font-semibold'}>{score}</div>
                      <div className={'p-4 font-semibold'}>
                        {date.toFormat('DD')}
                      </div>
                    </div>
                  ))}
                </div>
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
