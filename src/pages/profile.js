import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { getToken } from './api/auth/auth';
import { useSidebarContext } from './context/sidebarContext';
import RenderProfile from './profile/renderProfile'

function Profile() {
  const router = useRouter();
  const { setActiveTab } = useSidebarContext();


  useEffect(() => {
    setActiveTab(3)
    const token = getToken();
  if (!token) {
    router.push("/login");
  }
  }, []);

  return (
    <div>
        <RenderProfile />
    </div>
  )
}

export default Profile