import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { getToken } from './api/auth/auth';
import RenderCreateVoucher from './components/createVoucher/renderCreateVoucher'
// import RenderCreateVoucher from './components/createVoucher/RenderCreateVoucher'

function Createvouchers() {
  const router = useRouter();


  useEffect(() => {
    const token = getToken();
  if (!token) {
    router.push("/login");
  }
  }, []);
  return (
    <div>
        <RenderCreateVoucher  />
    </div>
  )
}

export default Createvouchers