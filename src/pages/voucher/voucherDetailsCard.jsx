import React from "react";
import styles from "../../styles/components/onevoucher.module.css";

function VoucherDetailsCard({ data }) {

  return (
    <div className={styles.content}>
      <div className={styles.detail}>
        <label>Title</label>
        <h5>{data.title}</h5>
      </div>
      <div className={styles.detail}>
        <label>Thumbnail/image/banner </label>
        <img src={data.thumbnail} alt="" />
      </div>
      <div className={styles.detail}>
        <label>Description</label>
        <h5>{data.description}</h5>
      </div>
      <div className={styles.detail}>
        <label>Total Number of vouchers</label>
        <h5>{data.totalNumberOfVouchers}</h5>
      </div>
      <div className={styles.detail}>
        <label>Amount per voucher</label>
        <h5>{data.amountPerVoucher}</h5>
      </div>
      <div className={styles.detail}>
        <label>Total Cashed Amount</label>
        <h5>{data.totalCashedAmount}</h5>
      </div>
      <div className={styles.detail}>
        <label>Cashed percentage</label>
        <h5>{data.cashedPercentage}</h5>
      </div>
      <div className={styles.detail}>
        <label>Total Amount</label>
        <h5>{data.totalAmount}</h5>
      </div>
    </div>
  );
}

export default VoucherDetailsCard;
