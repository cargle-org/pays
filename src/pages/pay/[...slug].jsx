/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from 'react';
import styles from "../../styles/components/paysuccess.module.css";
import Back from "../../assets/logo.svg";
import { useRouter } from 'next/router';
import useAmountFormatter from '@/hooks/useAmountFormatter';
import Loading from '../components/loading';
import { payToLink } from '../api/paymentLink/payToLink';
import { getSingleLink } from '../api/paymentLink/getSingleLink';
import { getUserDetails } from '../api/auth/auth';

const Makepayment = () => {
    const {formatAmount} = useAmountFormatter();
    const [amount, setAmount] = useState('');
    const [displayAmount, setDisplayAmount] = useState("");
    const userData = getUserDetails();
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const router = useRouter();
    const { slug } = router.query;
    const pathname = router?.asPath;
    const [errMSG, setErrMSG] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [linkDetails, setLinkDetails] = useState(null)

    useEffect(() => {
       if (slug) {
        (async() => {
            const res = await getSingleLink(slug[2]);
            if (res.success){
                setLinkDetails(res.link)
            }
            // console.log(res, "hello");
           })();
       }
        },[slug])

    const handleAmountChange = (event) => {
        const newValue = event.target.value;
         const formattedAmount = formatAmount(newValue);
            setAmount(formattedAmount);
            setDisplayAmount(new Intl.NumberFormat().format(formattedAmount));
      };

      const clearFields = () => {
        setFullName('');
        setAmount(0);
        setDisplayAmount('');
        setEmail('');
      };

      const handlePayment = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        const data = {
            name: fullName,
            amount,
            email,
            link: linkDetails.link,
        }
        const res = await payToLink(data);
        if ( res && res?.success){
            router.push(res.data);
            clearFields();
          } else {
            clearFields();
            setErrMSG("Unable to complete your request at the moment.");
            setIsLoading(false);
            setTimeout(() => {
                setErrMSG('')
            }, 7000)
            setIsLoading(false);
          }
      }

      const formatDate = (dateString) => {
        const options = { year: '2-digit', month: 'numeric', day: 'numeric' };
        if (dateString === '') {
            return '-'
        }
        return new Date(dateString).toLocaleDateString(undefined, options);
      };

      if (isLoading || !linkDetails) {
        return <Loading />;
      }

  return (
    <div className={styles.paymentSuccessPage}>
    <div className={styles.container}>
          <div className={styles.back} onClick={() => router.push('/')}>
              <Back /> 
          </div>
    <div className={styles.successBanner}>
          <form className={styles.payForm} onSubmit={(e) => handlePayment(e)}>
          {errMSG ? (
                <div className={styles.error}>{errMSG}</div>
              ) : (
                <div></div>
              )}
              <h4>{linkDetails.title}</h4>
            {linkDetails.description &&  <p>This link was created by {userData?.companyName ? userData?.companyName : userData?.name} to fund {linkDetails.description} {linkDetails?.linkExpiry && <span>and it expires on {formatDate(linkDetails.linkExpiry)}</span>}</p>}

             <label htmlFor="name">Name</label>
             <input type="text" id="name" name="name" placeholder='Enter Your Name' value={fullName} onChange={(event) => setFullName(event.target.value)} required/>
             <br />
             <br />
             <label htmlFor="email">Email</label>
             <input type="email" id="email" name="email" placeholder='Enter Email' value={email} onChange={(event) => setEmail(event.target.value)} required/>
             <br />
             <br />
             <label htmlFor="amount">Amount</label>
             <input type="text" id="amount" name="amount" placeholder='Enter Amount' value={displayAmount} onChange={(event) => handleAmountChange(event)} required/>
             <small>Maximum transaction <span>200,000</span></small>
             <br />
             <br />

              <button type='submit' className={styles.payBtn}>Make Payment</button>
          </form>
      </div>
    </div>
    <div className={styles.thumbnailContainer}>
         <div className={styles.thumbnailwrap}>
         <div className={styles.thumbnail}>
            <img src="/coins.jpg" alt="money"/>
            </div>
         </div>
      </div>
  </div>
  )
}

export default Makepayment;