import { ChallengeLeaderboardTabs, Header } from '@levi-math/components';

export const ChallengeLeaderboard = () => {
  return (
    <main className="w-full">
      <Header />
      <h1 className="mb-8 mt-4 text-center text-4xl font-bold">
        Challenge Leaderboard
      </h1>
      <ChallengeLeaderboardTabs />
    </main>
  );
};
