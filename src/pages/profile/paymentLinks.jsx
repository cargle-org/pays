import React, { useCallback, useEffect, useState } from 'react'
import { getAllLinks } from '../api/paymentLink/getAllLinks';
import Loading from '../components/loading';
import styles from '../../styles/components/allLinks.module.css'
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa6'

const PaymentLinks = () => {
    const [allLinks, setAllLinks] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setIsLoading] = useState(false);

    const handleNextClick = useCallback(() => {
        if (allLinks.length === 7){
            return setPage(prev => prev + 1);
        }
    },[allLinks.length]);

    const handlePrevClick = () => {
        return setPage(prev => prev - 1);
    };

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await getAllLinks({pageSize: 7, page});
            if (res.success) {
                setAllLinks(res.links);
                setIsLoading(false);
            }
        })();
    },[page]);

     const formatDate = (dateString) => {
        const options = { year: '2-digit', month: 'numeric', day: 'numeric' };
        if (dateString === '') {
            return '-'
        }
        return new Date(dateString).toLocaleDateString(undefined, options);
      };

      if(!allLinks.length || loading){
        return <Loading />
      };

  return (
    <div className={styles.container}>
        <h3>All Payment Links</h3>
       <div className={styles.table}> 
       <table id={styles.table}>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Link</th>
                    <th>Expiry</th>
                    
                </tr>
            </thead>
            <tbody>
             {allLinks.length && allLinks.map((link, i) => (
                <tr key={i}>
                    <td>{link.title}</td>
                    <td>{link.category}</td>
                    <td>{link.amount}</td>
                    <td>{link.link}</td>
                    <td>{formatDate(link.linkExpiry)}</td>
                    </tr>
             ))}
            </tbody>
        </table></div>
       <div className={styles.btn}>
       {page !== 1 && 
       <button type='button' onClick={handlePrevClick}>
            <FaAngleLeft color="white" />
        </button>}
       <button type='button' onClick={handleNextClick}>
            <FaAngleRight color="white" />
        </button>
       </div>
    </div>
  )
}

export default PaymentLinks