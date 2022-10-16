import { GameConfig } from '@levi-math/common';
import { GameOptions, Header, IntroHeader } from '@levi-math/components';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  const handleStart = (cfg: GameConfig) => {
    localStorage.setItem('gameConfig', JSON.stringify(cfg));
    navigate('/game');
  };

  return (
    <main className="w-full">
      <Header />
      <div className="flex justify-center">
        <div className="max-w-lg rounded-lg bg-gray-200 p-10">
          <div className="flex flex-col gap-y-8">
            <IntroHeader />

            <GameOptions onClick={handleStart} />
          </div>
        </div>
      </div>
    </main>
  );
};
