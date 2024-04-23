import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { getToken } from './api/auth/auth';
import { useSidebarContext } from './context/sidebarContext';
import RenderDashboard from './dashboard/renderDashboard'

function Dashboard() {
  const router = useRouter();
  const { setActiveTab } = useSidebarContext();


  useEffect(() => {
    setActiveTab(1)
    const token = getToken();
  if (!token) {
    router.push("/login");
  }
  }, []);

  return (
    <div>
      <RenderDashboard />
    </div>
  )
}

export default Dashboard