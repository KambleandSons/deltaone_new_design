import React, { useEffect } from 'react';
import EditDesk from '../../components/review/EditDesk';

export default function EditDeskPage() {
  useEffect(() => {
    document.title = "Bolt's Edit Desk · Review HQ";
  }, []);

  return (
    <div className="py-6 px-4 max-w-5xl mx-auto">
      <EditDesk />
    </div>
  );
}

