import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { getToken } from './api/auth/auth';
import { useSidebarContext } from './context/sidebarContext';
import RenderPayment from './payment/renderPayment'

function Payment() {
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
        <RenderPayment />
    </div>
  )
}

export default Payment