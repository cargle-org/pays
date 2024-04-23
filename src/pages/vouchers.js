import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { getToken } from './api/auth/auth';
import { useSidebarContext } from './context/sidebarContext';
import RenderVoucher from './voucher/renderVoucher'

function Vouchers() {

  const router = useRouter();
  const { setActiveTab } = useSidebarContext();


  useEffect(() => {
    setActiveTab(2)
    const token = getToken();
  if (!token) {
    router.push("/login");
  }
  }, []);

  return (
    <div>
        <RenderVoucher />
    </div>
  )
}

export default Vouchers