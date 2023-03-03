import React from 'react'
import { useRouter } from "next/router";
import { verifyAccount } from './api/payment/verifyAccount';

function AccountCreated() {
  const router = useRouter();
  const { id, emailToken } = router.query;
  // const { transaction_id } = router.query;

  useEffect(() => {
    (async () => {
      const res = await verifyAccount({ id, emailToken });
    })();
  }, [id, emailToken]);


  return (
    <div 
    style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
      }}
    >
        <div
        style={{
          width: "100%",
          maxWidth: 600,
          padding: 20,
          background: "#f7f7f7",
          display: "flex",
          flexWrap: "wrap",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <h6 style={{ margin: 20 }}>
          Your account have been verified successfully, please login to get started.
        </h6>

        <div style={{ width: "100%", margin: 20 }}>
          <button onClick={() => router.push("/login")} style={{ width: 200 }}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default AccountCreated