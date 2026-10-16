import React, { useEffect } from 'react';
import SignOffSheet from '../../components/review/SignOffSheet';
import SvgDefs from '../../components/layout/SvgDefs';

export default function SignOffPage() {
  useEffect(() => {
    document.title = 'Sign-Off Sheet · 10 Open Decisions';
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      <SvgDefs />
      <SignOffSheet />
    </div>
  );
}


