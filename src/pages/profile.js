import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { getToken } from './api/auth/auth';
import RenderProfile from './profile/renderProfile'

function Profile() {
  const router = useRouter();


  useEffect(() => {
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