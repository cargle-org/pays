import React from 'react'
import styles from "../styles/components/transactionsuccess.module.css"
import Logo from "../assets/logo.svg"
import Image from 'next/image'
import { useRouter } from 'next/router'

const Transactionsuccess = () => {
const router = useRouter();
  return (
    <div className={styles.container}>
    <div className={styles.logo} onClick={() => router.push('/register')}>
        <Logo />
    </div>
<div className={styles.successBanner}>
    <div className={styles.banner}>
       <h3>Transaction</h3>
       <h3>Successful</h3>
       <Image src='/done.png' alt="success" width={130} height={80}
       />
        <div className={styles.transactionText}>
            <p>For complaints or refund incase of failed transaction, click below to sign up</p>
        </div>
        <button className={styles.onboardBtn} onClick={() => router.push('/register')}>Sign up</button>
    </div>
</div>
</div>
  )
}

export default Transactionsuccess