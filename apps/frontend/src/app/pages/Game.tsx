import { GameConfig } from '@levi-math/common';
import { GameScreen, Header } from '@levi-math/components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Game = () => {
  const navigate = useNavigate();

  const [config, setConfig] = useState<GameConfig | null>(null);

  useEffect(() => {
    const parsedConfig = localStorage.getItem('gameConfig');

    if (!parsedConfig) {
      navigate('/');
      return;
    }

    const config: GameConfig = JSON.parse(parsedConfig);

    setConfig(config);
  }, [navigate]);

  if (!config) return null;

  return (
    <main className="w-full">
      <Header />
      <GameScreen config={config} />
    </main>
  );
};
