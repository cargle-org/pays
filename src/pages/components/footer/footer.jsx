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
                <a href="#" style={{color: 'white'}}><BsFacebook className={styles.icon}/></a>
                <a href="https://www.linkedin.com/company/usepays-co/" target='_blank' rel='noreferrer' style={{color: 'white'}}><AiFillLinkedin className={styles.icon}/></a>
                <a href="#" style={{color: 'white'}}><AiOutlineTwitter className={styles.icon}/></a>
                <a href="https://instagram.com/usepays_co" target='_blank' rel='noreferrer' style={{color: 'white'}}><GrInstagram className={styles.icon}/></a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer