import { Header, LeaderboardTabs } from '@levi-math/components';

export const Leaderboard = () => {
  return (
    <main className="w-full">
      <Header />
      <h1 className="mb-8 mt-4 text-center text-4xl font-bold">Leaderboard</h1>
      <LeaderboardTabs />
    </main>
  );
};
