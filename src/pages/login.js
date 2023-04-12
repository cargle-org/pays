import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { getToken } from './api/auth/auth';
import SignIn from './signin/signin'

function LogIn() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
  if (token) {
    router.push("/dashboard");
  }
  }, []);


  return (
    <div>
      <SignIn />
    </div>
  )
}

export default LogIn