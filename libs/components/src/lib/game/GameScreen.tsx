import { GameConfig, isEligible, Maths } from '@levi-math/common';
import { usePostScoreMutation } from '@levi-math/gql';
import { DateTime } from 'luxon';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export interface GameScreenProps {
  config: GameConfig;
}

export const GameScreen = ({ config }: GameScreenProps) => {
  const navigate = useNavigate();

  const [posted, setPosted] = useState(false);
  const [score, setScore] = useState(0);

  const [time, setTime] = useState(config.duration);
  const [endTime, setEndTime] = useState<DateTime>(
    DateTime.now().plus({ seconds: config.duration })
  );

  const [inputValue, setInputValue] = useState('');
  const [{ lhs, op, rhs, solution }, setQuestion] = useState(
    Maths.nextQuestion(config)
  );

  const resetGame = useCallback(() => {
    setTime(config.duration);
    setEndTime(DateTime.now().plus({ seconds: config.duration }));
    setScore(0);
    setInputValue('');
    setPosted(false);
    setQuestion(Maths.nextQuestion(config));
  }, [config]);

  const onInput = useCallback(
    (newValue: string) => {
      setInputValue(newValue);
      if (newValue === solution.toString()) {
        setScore((score) => score + 1);
        setQuestion(Maths.nextQuestion(config));
        setInputValue('');
      }
    },
    [config, solution]
  );

  const operationToString = useCallback((op: string) => {
    switch (op) {
      case '+':
        return '+';
      case '-':
        return '-';
      case '*':
        return '×';
      case '/':
        return '÷';
      default:
        return '';
    }
  }, []);

  useEffect(() => {
    let secondsLeft = endTime.diffNow().as('seconds');

    const interval = setInterval(() => {
      secondsLeft = endTime.diffNow().as('seconds');
      setTime(secondsLeft);

      if (secondsLeft <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  const [execPostScore] = usePostScoreMutation();

  const [name, setName] = useState('');
  const isEligibleForLeaderboard = useMemo(() => isEligible(config), [config]);

  const postScore = useCallback(async () => {
    setPosted(true);

    await execPostScore({
      variables: {
        score,
        name,
      },
    });

    toast.success('Score posted to leaderboard!');
  }, [execPostScore, name, score]);

  return (
    <main className="w-full">
      <div className="flex w-full justify-between p-6">
        <div>Seconds left: {Math.round(time)}</div>
        <div>Score: {score}</div>
      </div>
      <div className="flex w-full">
        <div className="mt-20 w-full bg-gray-200 p-4">
          <div className="flex w-full items-center justify-center gap-x-2">
            {time > 0 ? (
              <>
                <div className="text-center text-4xl">
                  {lhs} {operationToString(op)} {rhs} =
                </div>
                <input
                  className="mb-1 w-32 rounded px-2 text-4xl"
                  value={inputValue}
                  onChange={(e) => onInput(e.target.value)}
                />
              </>
            ) : (
              <div className="flex-col text-center">
                <div className="mb-4 text-3xl">Final Score: {score}</div>
                {isEligibleForLeaderboard && !posted && (
                  <div className="flex items-center gap-x-4">
                    <div className="">
                      <input
                        className="rounded p-2"
                        placeholder="name (required)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={postScore}
                      disabled={!name}
                      className="w-40 rounded bg-sky-500 p-2 text-lg font-semibold text-white transition-colors hover:bg-sky-400 disabled:bg-gray-400"
                    >
                      Submit Score
                    </button>
                  </div>
                )}
                <div className="mt-4 flex items-center justify-center gap-x-8">
                  <button
                    className="rounded p-1 px-2 text-sky-500 transition-colors hover:bg-gray-100"
                    onClick={resetGame}
                  >
                    Play Again
                  </button>
                  <button
                    className="rounded p-1 px-2 text-sky-500 transition-colors hover:bg-gray-100"
                    onClick={() => {
                      localStorage.removeItem('gameConfig');
                      navigate('/');
                    }}
                  >
                    Change Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
