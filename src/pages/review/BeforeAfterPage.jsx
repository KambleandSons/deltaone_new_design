import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BeforeAfter from '../../components/review/BeforeAfter';
import SvgDefs from '../../components/layout/SvgDefs';

export default function BeforeAfterPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Before and After Comparisons · Delta One';
  }, []);

  const handleSwitchView = (view) => {
    if (view === 'backoffice') navigate('/');
    else if (view === 'review') navigate('/review');
    else if (view === 'sign-off') navigate('/sign-off');
    else navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      <SvgDefs />
      <BeforeAfter onSwitchView={handleSwitchView} />
    </div>
  );
}


