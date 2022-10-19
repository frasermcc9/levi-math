import { Header } from '@levi-math/components';
import { useNavigate } from 'react-router-dom';

export const DailyPrepare = () => {
  const navigate = useNavigate();

  return (
    <main className="w-full">
      <Header />
      <div className="flex flex-col items-center justify-center">
        <div>
          <div className="max-w-lg rounded-2xl bg-gray-200 p-10">
            <div className="flex flex-col gap-y-8">
              <div>
                <h1 className="mb-4 text-xl font-bold">Daily Challenge</h1>
                <div className="flex flex-col gap-y-4">
                  <p>
                    All players get the same question set. You must answer the
                    fifteen questions as fast as you can.
                  </p>
                  <p>
                    WARNING! Your first score each day is the only one that
                    counts. You can try again, but your score will not be
                    recorded.
                  </p>
                  <p>
                    Make sure you are ready to go before you start. You will not
                    be able to pause the game.
                  </p>
                  <p>
                    Your google display name will be used to record your score
                    on the leaderboard (so if you don't want that then do not
                    play this).
                  </p>
                  <button
                    onClick={() => navigate('/daily-challenge')}
                    className="w-full rounded bg-sky-500 p-2 text-lg font-semibold text-white transition-colors hover:bg-sky-400"
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
