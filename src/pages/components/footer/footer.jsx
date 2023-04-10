import React from 'react'
import styles from "../../../styles/components/footer.module.css"
import { BsFacebook } from 'react-icons/bs';
import { AiFillLinkedin, AiOutlineTwitter } from 'react-icons/ai';
import { GrInstagram } from 'react-icons/gr';

function Footer() {
  return (
    <div className={styles.footer}>
        <div className={styles.container}>
            <div className={styles.content}>
                <p>Copyright @ pays.co</p>
                <div className={styles.socials}>
                <BsFacebook className={styles.icon}/>
                <AiFillLinkedin className={styles.icon}/>
                <AiOutlineTwitter className={styles.icon}/>
                <GrInstagram className={styles.icon}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer