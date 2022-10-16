import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Game } from './pages/Game';
import { Home } from './pages/Home';
import { Leaderboard } from './pages/Leaderboard';

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
