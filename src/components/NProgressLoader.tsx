// src/app/components/NProgressLoader.tsx
'use client'; // Mark this component as a client component
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.2 });

const NProgressLoader: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // When the route or search params change, it means the navigation has completed
    NProgress.done();
    
    // Optional: Start progress on unmount if we could detect navigation intent.
    // Since App Router doesn't have routeChangeStart, we mostly use this to cleanup.
  }, [pathname, searchParams]);

  useEffect(() => {
    // Global fetch interceptor to show progress on API calls if desired
    // (Optional and can be noisy, but helps show "something is happening")
    return () => {
      NProgress.done();
    };
  }, []);

  return null;
};

export default NProgressLoader;

