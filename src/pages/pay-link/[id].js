import React, { useContext, useEffect, useState } from 'react';
import styles from "../../styles/components/paysuccess.module.css";
import Back from "../../assets/back.svg";
import Link from '../../assets/chain.svg'
import Image from 'next/image';
import { useRouter } from 'next/router';
import {MdOutlineMailOutline, MdWhatsapp} from "react-icons/md"
import { getSingleLink } from '../api/paymentLink/getSingleLink';
import Loading from '../components/loading';
import {BsFillInfoCircleFill} from 'react-icons/bs'
import ReactDOMServer from 'react-dom/server';

const PayLink = () => {
    const router = useRouter();
    const [linkDetails, setLinkDetails] = useState(null);
    const [openShare, setOpenShare] = useState(false);
    const [copied, setCopied] = useState(false);
    const {id} = router.query;
    const date = new Date(linkDetails?.linkExpiry);

    useEffect(() => {
        if (id) {
          (async () => {
            try {
              const res = await getSingleLink(id);
              if (res.success) {
                setLinkDetails(res.link);
              }
            } catch (error) {
              console.error(error);
            }
          })();
        }
      }, [id]);

      if (!linkDetails) {
        return <Loading />
      };


    const handleCopy = () => {
        navigator.clipboard.writeText(linkDetails.link + `/${id}`);
        setCopied(true)
        setTimeout(() => {
            setCopied(false);
        }, 3000)
      };
   const handleOpenShare=() => {
        setOpenShare((prev) => !prev)
      };

      const handleWhatsAppShare = () => {
        const shareText= `Hey there, this is the link to fund my personal usepays account for ${linkDetails.title}: ${linkDetails.link + `/${id}`}. Thank you for supporting me. This link is only valid until ${date.toLocaleDateString()}`
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
        window.open(whatsappUrl);
      };

      const handleEmailShare = () => {
        const emailSubject = 'My Personalized Payment link';
        const emailBody = ReactDOMServer.renderToString(`Hey there! Here is the link to send funds to my personal usepays account for ${linkDetails.title}: ${linkDetails.link + `/${id}`}. This link is only valid until ${date.toLocaleDateString()} 
        `);
      
        window.location.href = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      };
      
  return (
    <div className={styles.paymentSuccessPage}>
      <div className={styles.container}>
            <div className={styles.back} onClick={() => router.back()}>
                <Back /> Back
            </div>
      <div className={styles.successBanner}>
            <div className={styles.banner}>
                <Image src='/done.png' alt='success' width={100} height={70}/>
                <div className={styles.bannerDesc}>
                    <p>Your Payment link for</p>
                    <h3>  {linkDetails?.title}</h3>
                    <p>has been created successfully</p>
                </div>
                <div className={styles.link}>
                    {linkDetails?.link}
                </div>
                <div className={styles.buttons}>
                    <button className={styles.copybtn} onClick={handleCopy}> 
                    <Link /> Copy Link
                    </button>
                    <button className={styles.sharebtn} onClick={handleOpenShare}>Share</button>
                </div>
                {openShare && <div className={styles.openShare}>
                    <p>Share link via:</p>
                    <div className={styles.sharebuttons}>
                        <button type="button" onClick={handleEmailShare}><MdOutlineMailOutline  size={40}/></button>
                        <button type='button' onClick={handleWhatsAppShare}><MdWhatsapp size={40} /></button>
                    </div>
                </div>}
                {copied &&  <p className={styles.copyMsg}> <BsFillInfoCircleFill size={20} /> Link has been copied to your clipboard!</p>}
            </div>
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

export default PayLink