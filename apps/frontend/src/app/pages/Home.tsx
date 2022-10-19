import { GameConfig } from '@levi-math/common';
import { GameOptions, Header, IntroHeader } from '@levi-math/components';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  const handleStart = (cfg: GameConfig) => {
    localStorage.setItem('gameConfig', JSON.stringify(cfg));
    navigate('/game');
  };

  const handleDailyChallenge = () => navigate('/daily-prepare');

  return (
    <main className="w-full">
      <Header />
      <div className="flex flex-col items-center justify-center">
        <div>
          <button
            className="text-blue-500 underline"
            onClick={handleDailyChallenge}
          >
            Daily Challenge
          </button>
          <div className="max-w-lg rounded-2xl bg-gray-200 p-10">
            <div className="flex flex-col gap-y-8">
              <IntroHeader />

              <GameOptions onClick={handleStart} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
