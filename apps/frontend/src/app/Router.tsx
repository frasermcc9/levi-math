import { useAuth } from '@levi-math/components';
import React, { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ChallengeLeaderboard } from './pages/ChallengeLeaderboard';
import { DailyChallenge } from './pages/DailyChallenge';
import { DailyPrepare } from './pages/DailyPrepare';
import { Game } from './pages/Game';
import { Home } from './pages/Home';
import { Leaderboard } from './pages/Leaderboard';
import { LoginPage } from './pages/Login';

export const Router: React.FC = () => {
  const { loggedIn } = useAuth();

  const authRoutes = useMemo(
    () =>
      [
        ['/daily-challenge', <DailyChallenge />],
        ['/daily-prepare', <DailyPrepare />],
      ] as const,
    []
  );

  const authenticatedRouteMap = useMemo(
    () =>
      authRoutes.map(([path, element]) => (
        <Route key={path} path={path} element={element} />
      )),
    [authRoutes]
  );

  const unauthenticatedRouteMap = useMemo(
    () => [
      authRoutes.map(([path]) => (
        <Route
          key={path}
          path={path}
          element={<Navigate to={`/auth?next=${path}`} replace />}
        />
      )),
    ],
    [authRoutes]
  );

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/challenge-board" element={<ChallengeLeaderboard />} />
      {loggedIn ? authenticatedRouteMap : unauthenticatedRouteMap}
      <Route path="/auth" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
