import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { getToken } from './api/auth/auth';
import RenderPayment from './payment/renderPayment'

function payment() {
  const router = useRouter();


  useEffect(() => {
    const token = getToken();
  if (!token) {
    router.push("/login");
  }
  }, []);
  
  return (
    <div>
        <RenderPayment />
    </div>
  )
}

export default payment