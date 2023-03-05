import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { getToken } from './api/auth/auth';
import RenderDashboard from './dashboard/renderDashboard'

function Dashboard() {
  const router = useRouter();


  useEffect(() => {
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