import { HomeIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full text-gray-400">
      <div className="flex gap-x-2 pl-4 pt-4">
        <HomeIcon
          className="w-12 rounded p-1 transition-colors hover:bg-gray-100"
          onClick={() => navigate('/')}
        />
        <ChartBarIcon
          className="w-12 rounded p-1 transition-colors hover:bg-gray-100"
          onClick={() => navigate('/leaderboard')}
        />
      </div>
    </div>
  );
};
