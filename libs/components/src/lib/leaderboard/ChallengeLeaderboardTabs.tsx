import { Tab } from '@headlessui/react';
import { useDailyChallengeResultsQuery } from '@levi-math/gql';
import classNames from 'classnames';
import { Duration } from 'luxon';
import { useMemo } from 'react';

export const ChallengeLeaderboardTabs = () => {
  const { data: dailyChallengeData } = useDailyChallengeResultsQuery({
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
      'Daily Challenge': dailyChallengeData?.getDailyScores,
    }),
    [dailyChallengeData?.getDailyScores]
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
                  {category?.map(({ user: { username }, ms, date }, index) => (
                    <div
                      key={index}
                      className={classNames(
                        'grid grid-cols-4',
                        bgColorMap[index],
                        { 'rounded-b-lg': index === category.length - 1 }
                      )}
                    >
                      <div className={'p-4 font-semibold'}>{index + 1}</div>
                      <div className={'p-4 font-semibold'}>{username}</div>
                      <div className={'p-4 font-semibold'}>
                        {Duration.fromMillis(ms ?? 0)
                          .shiftTo('seconds')
                          .toObject().seconds + 's'}
                      </div>
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
