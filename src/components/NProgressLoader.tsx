// src/app/components/NProgressLoader.tsx
'use client'; // Mark this component as a client component
import { useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress'; // Import NProgress library

// Include NProgress CSS styles
import 'nprogress/nprogress.css'; // Make sure you have NProgress CSS

NProgress.configure({ showSpinner: false }); // Configure NProgress

const NProgressLoader: React.FC = () => {
  useEffect(() => {
    const handleStart = () => NProgress.start(); // Start NProgress
    const handleStop = () => NProgress.done(); // Stop NProgress

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleStop);
    Router.events.on('routeChangeError', handleStop);

    // Cleanup the event listeners on component unmount
    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleStop);
      Router.events.off('routeChangeError', handleStop);
    };
  }, []);

  return null;
};

export default NProgressLoader;
