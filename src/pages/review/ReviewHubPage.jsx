import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewUXUI from '../../components/review/ReviewUXUI';
import SvgDefs from '../../components/layout/SvgDefs';

export default function ReviewHubPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Back Office Review UX / UI · Delta One';
  }, []);

  const handleSwitchView = (view) => {
    if (view === 'backoffice') navigate('/');
    else if (view === 'before-after') navigate('/before-after');
    else if (view === 'sign-off') navigate('/sign-off');
    else if (view === 'edit-desk') navigate('/edit-desk');
    else if (view === 'bolt-demo') navigate('/bolt-demo');
    else navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      <SvgDefs />
      <ReviewUXUI onSwitchView={handleSwitchView} />
    </div>
  );
}


