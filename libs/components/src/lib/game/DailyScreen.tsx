import { Maths } from '@levi-math/common';
import {
  useGetDailyQuestionsQuery,
  useEndDailyMutation,
  useStartDailyMutation,
} from '@levi-math/gql';
import { DateTime } from 'luxon';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

export const DailyScreen = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(DateTime.now());
  const [duration, setDuration] = useState(0);

  const { data, loading } = useGetDailyQuestionsQuery();

  const questions = useMemo(() => {
    if (!data) return [];
    return data.getDailyQuestions;
  }, [data]);

  useEffect(() => {
    if (!data || loading) return;
    setStartTime(DateTime.now());
  }, [data, loading]);

  const [inputValue, setInputValue] = useState('');
  const { lhs, operator: op, rhs } = questions[score] ?? {};

  const solution = useMemo(() => {
    if (!lhs || !op || !rhs) return 0;
    return Maths.solve(lhs, op, rhs);
  }, [lhs, op, rhs]);

  const onInput = useCallback(
    (newValue: string) => {
      setInputValue(newValue);
      if (newValue === solution.toString()) {
        setScore((score) => score + 1);
        setInputValue('');
      }
    },
    [solution]
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
    let secondsThrough = DateTime.now().diff(startTime).as('seconds');

    if (loading) {
      return;
    }

    const interval = setInterval(() => {
      if (questions.length && questions.length === score) {
        clearInterval(interval);
        return;
      }
      secondsThrough = DateTime.now().diff(startTime).as('seconds');
      setDuration(secondsThrough);
    }, 1000);

    return () => clearInterval(interval);
  }, [loading, questions.length, score, startTime]);

  const [key, setKey] = useState<string | null>(null);
  const [execStartDaily, { called }] = useStartDailyMutation();

  useEffect(() => {
    execStartDaily().then(({ data }) => {
      if (data?.startDaily) {
        setKey(data.startDaily);
      }
    });
  }, [called, execStartDaily]);

  const [execEndDaily] = useEndDailyMutation();

  useEffect(() => {
    if (questions.length && score === questions.length && key) {
      const duration = DateTime.now().diff(startTime).as('milliseconds');
      execEndDaily({ variables: { key, duration } });
    }
  }, [duration, execEndDaily, key, questions.length, score, startTime]);

  return (
    <main className="w-full">
      <div className="flex w-full justify-between p-6">
        <div>Time taken: {Math.round(duration)}</div>
        <div>Score: {score}</div>
      </div>
      <div className="flex w-full">
        <div className="mt-20 w-full bg-gray-200 p-4">
          <div className="flex w-full items-center justify-center gap-x-2">
            {!questions.length && <>Loading</>}
            {!!questions.length &&
              (score < questions.length ? (
                <>
                  <div className="text-center text-4xl">
                    {lhs} {operationToString(op)} {rhs} =
                  </div>
                  <input
                    className="mb-1 w-32 rounded px-2 text-4xl"
                    value={inputValue}
                    onChange={(e) => onInput(e.target.value)}
                    ref={(input) => input?.focus()}
                  />
                </>
              ) : (
                <div className="flex-col text-center">
                  <div className="mb-4 text-3xl">Final Score: {score}</div>

                  <div className="mt-4 flex items-center justify-center gap-x-8">
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
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};
