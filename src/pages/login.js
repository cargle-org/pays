import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { getToken } from './api/auth/auth';
import Header from './components/header/header'
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
      <Header />
      <SignIn />
    </div>
  )
}

export default LogIn