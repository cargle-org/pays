import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { getToken } from './api/auth/auth';
import RenderCreatePaymentLink from './components/createPaymentLink/renderCreatePaymentLink';

function PaymentLink() {
  const router = useRouter();


  useEffect(() => {
    const token = getToken();
  if (!token) {
    router.push("/login");
  }
  }, [router]);
  return (
    <div>
        <RenderCreatePaymentLink  />
    </div>
  )
}

export default PaymentLink