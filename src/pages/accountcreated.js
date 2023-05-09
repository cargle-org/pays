import React from 'react'
import { useRouter } from "next/router";

function AccountCreated() {
  const router = useRouter();
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
          Your account have been created successfully, please verify your email to get started.
        </h6>

        <div style={{ width: "100%", margin: 20 }}>
          <button onClick={() => router.push("/login")} style={{ width: 200 }}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default AccountCreated