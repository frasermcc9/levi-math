import { HomeIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full text-gray-400">
      <div className="flex gap-x-2 pl-4 pt-4">
        <HomeIcon
          className="w-12 cursor-pointer rounded p-1 transition-colors hover:bg-gray-100"
          onClick={() => navigate('/')}
        />
        <ChartBarIcon
          className="w-12 cursor-pointer rounded p-1 transition-colors hover:bg-gray-100"
          onClick={() => navigate('/leaderboard')}
        />
        <CrownIcon
          className="w-12 cursor-pointer rounded p-1 transition-colors hover:bg-gray-100"
          onClick={() => navigate('/challenge-board')}
        />
      </div>
    </div>
  );
};

const CrownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    style={{ fill: 'currentcolor' }}
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M896 708.757333v101.866667A106.538667 106.538667 0 0 1 789.418667 917.333333H234.581333A106.581333 106.581333 0 0 1 128 810.624v-101.866667l-82.858667-367.573333c-14.4-75.178667 47.317333-113.344 107.392-68.48l157.504 117.717333c7.722667 5.76 13.888 4.309333 18.133334-4.117333l116.394666-231.957333c31.914667-63.594667 102.976-63.530667 134.848 0l116.416 231.957333c4.266667 8.448 10.389333 9.877333 18.133334 4.117333l157.504-117.717333c60.074667-44.885333 121.813333-6.784 107.392 68.48L896 708.736zM204.8 661.333333h614.4l65.92-292.309333-120.106667 89.749333c-50.197333 37.525333-117.333333 21.824-145.450666-34.197333L512 210.24l-107.584 214.336c-28.074667 55.957333-95.232 71.722667-145.450667 34.197333l-120.064-89.728L204.778667 661.333333z m8.533333 149.290667A21.248 21.248 0 0 0 234.581333 832h554.837334A21.205333 21.205333 0 0 0 810.666667 810.624V746.666667H213.333333v63.957333z"
      fill=""
    />
  </svg>
);
