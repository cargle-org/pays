/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import styles from "../../../styles/components/createvoucherpage.module.css";
import Back from "../../../assets/back.svg";
import Loading from '../loading';
import { useRouter } from 'next/router';
import { createLink } from '@/pages/api/paymentLink/createLink';
import useAmountFormatter from '@/hooks/useAmountFormatter';
import { LinkContext } from '@/pages/context/linkContext';
import {linkURL} from '../../../utils/constants'
import { getUserDetails } from '@/pages/api/auth/auth';

const CreatePaymentLinkBody = () => {
  const router = useRouter();
  const {formatAmount} = useAmountFormatter();
  const userData = getUserDetails();
  const username = userData && userData?.name?.replace(/\s/g, '');
  const [title, setTitle] = useState("");
  const [formatTitle, setFormatTitle] = useState("")
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState(0);
  const [displayAmount, setDisplayAmount] = useState("");
  const [errMSG, setErrMSG] = useState("");
  const [expiry, setExpiry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {categories} = useContext(LinkContext);


// const handleFileInputChange = (event) => {
//   if (event.target.files && event.target.files.length > 0) {
//     setVoucherThumbnail(event.target.files[0]);
//     setcmgThumbnail(URL.createObjectURL(event.target.files[0]));
//   }
// };


const handleTitle = (e) => {
  const value = e.target.value;
  setTitle(value);
  const formattedTitle = value.replace(/\s/g, '');
  setFormatTitle(formattedTitle);
};

const handleAmountChange = (event) => {
  const newValue = event.target.value;
   const formattedAmount = formatAmount(newValue);
      setAmount(formattedAmount);
      setDisplayAmount(new Intl.NumberFormat().format(formattedAmount));
};

const clearFields = () => {
  setTitle('');
  setAmount(0);
  setDisplayAmount('');
  setCategory('');
  setDescription('');
  setExpiry('');
};

const handleLinkCreation = async(e) => {
  e.preventDefault();
  setIsLoading(true);
  const data = {
    title,
    amount: Number(amount),
    category,
    description,
    linkExpiry: expiry || "2050-09-24T00:00",
    link: `${linkURL}pay/${username}/${formatTitle}`
  }
  const res = await createLink(data);
  if ( res && res?.success){
    router.push(`/pay-link/${res.link._id}`);
    clearFields();
  } else {
    clearFields();
    setErrMSG("Unable to generate your link. Please check that you are using a unique title and try again");
    setTimeout(() => {
        setErrMSG('')
    }, 7000)
    setIsLoading(false);
  }
}

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.createVoucherPage}>
      <div className={styles.container}>
      <form onSubmit={(e) => handleLinkCreation(e)}>
          <div className={styles.colOne}>
            <div className={styles.back} onClick={() => router.back()}>
              <Back /> Back
            </div>
            <div className={styles.paymentTitle}>
              <h3>Create Payment Link</h3>
            </div>
            <div className={styles.content}>
              {errMSG ? (
                <div className={styles.error}>{errMSG}</div>
              ) : (
                <div></div>
              )}
              <label>Title</label>
              <input
                placeholder="Enter a title for your payment link"
                value={title}
                onChange={(e) => handleTitle(e)}
                type="text"
                required
              />
              <label>Category</label>
              <select name="" id=""  required onChange={(e) => setCategory(e.target.value.toLowerCase())}>
              <option value="">~select a category~</option>
                {categories.length && categories.map((category, index) => (
                   <option value={category} key={index}>{category}</option>
                ))}
              </select>

              <label>Description</label>
              <textarea
                placeholder="Enter your payment link description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>

              <label>Amount</label>
              <input
                value={displayAmount}
                name="amount" 
                placeholder="Set Amount"
                onChange={(event) => handleAmountChange(event)}
                type="text"
                maxLength={7}
                required
              />
              <p className={styles.amountBandwidth}>Maximum transaction <span>200,000</span></p>
 
              <label className={styles.expiryLabel}> Link Expiry <small>Optional</small></label>
              <input
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                type="datetime-local"
                className={styles.expiryInput}
              />
              <button type='submit' className={styles.paymentButton}
              >
                Create Link
              </button>
            </div>
          </div>
          <div className={styles.paymentColTwo}>
           <div className={styles.thumbnail}>
            <img src="/coins.jpg" alt="money"/>
            </div>
          </div>
        </form>
      </div>
      </div>
  )
}

export default CreatePaymentLinkBody