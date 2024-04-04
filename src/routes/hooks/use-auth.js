import Cookies from 'js-cookie';
import { useEffect } from 'react';

import { useRouter } from './use-router';

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const jwt = Cookies.get('jwt');

    // If JWT token is not set, redirect to login page
    if (!jwt) {
      router.push('/login');
    }
  }, [router]);

  return null;
};