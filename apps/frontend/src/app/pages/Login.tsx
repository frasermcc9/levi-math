import { Header, LoginButton, useAuth } from '@levi-math/components';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const LoginPage = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const { loggedIn } = useAuth();

  useEffect(() => {
    if (loggedIn) {
      navigate(searchParams.get('next') ?? '/');
    }
  }, [loggedIn, navigate, searchParams]);

  return (
    <main className="w-full">
      <Header />
      <div className="flex flex-col items-center justify-center">
        <div>
          <div className="max-w-lg rounded-2xl bg-gray-200 p-10">
            <h1 className="text-xl font-semibold">
              You need to login to access this page.
            </h1>
            <div className="mt-4 flex flex-col">
              <LoginButton redirectTo={searchParams.get('next') ?? undefined} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
