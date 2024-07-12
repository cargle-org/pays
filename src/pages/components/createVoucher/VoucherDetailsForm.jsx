import React from "react";
import styles from "../../../styles/components/createvoucherpage.module.css";

const VoucherDetailsForm = ({
  title,
  setTitle,
  description,
  setDescription,
  voucherKey,
  setVoucherKey,
  expiryDate,
  setExpiryDate,
  noOfVouchers,
  setNoOfVouchers,
  amountPerVoucher,
  handleAmountPerVoucherChange,
  amountError,
  subTotalAmount,
  cmgFee,
  totalAmount,
  handleCreateVoucher,
  handleNextStep,
  errMSG,
}) => (
  <div className={styles.colOne}>
    <div className={styles.title}>
      <h2>Create Vouchers</h2>
    </div>
    <div className={styles.content}>
      {errMSG && <div className={styles.error}>{errMSG}</div>}
      <label>Title</label>
      <input
        placeholder="Enter voucher title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
      />
      <label>Description</label>
      <textarea
        placeholder="Enter voucher description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label>Voucher Key</label>
      <input
        value={voucherKey}
        placeholder="Enter five unique letters for your voucher key"
        onChange={(e) => setVoucherKey(e.target.value)}
        type="text"
        maxLength={5}
      />
      <label>Expiry date</label>
      <input
        value={expiryDate}
        placeholder="Enter expiry date for voucher key"
        onChange={(e) => setExpiryDate(e.target.value)}
        type="date"
      />
      <div className={styles.sortAmount}>
        <div className={styles.input}>
          <label>Number of vouchers</label>
          <input
            value={noOfVouchers}
            onChange={(e) => setNoOfVouchers(e.target.value)}
            type="number"
          />
        </div>
        <div className={styles.input}>
          <label>Amount per voucher</label>
          <input
            value={amountPerVoucher}
            onChange={handleAmountPerVoucherChange}
            type="number"
            min="100"
          />
          {amountError && <div className={styles.error}>{amountError}</div>}
        </div>
      </div>
      <div className={styles.amounts}>
        <div className={styles.one}>
          <h6>Sub total</h6> <h5>₦{subTotalAmount}</h5>
        </div>
        <div className={styles.one}>
          <h6>CMG Fee</h6> <h5>₦{cmgFee}</h5>
        </div>
        <div className={styles.two}>
          <h6>Total Amount</h6> <h4>₦{totalAmount}</h4>
        </div>
      </div>
      <div className={styles.buttons}>
        <button
          onClick={handleCreateVoucher}
          disabled={
            totalAmount === "0" ||
            voucherKey === "" ||
            amountPerVoucher === 0 ||
            noOfVouchers === 0 ||
            expiryDate === "" ||
            title === ""
          }
        >
          Create Voucher
        </button>
        <button onClick={handleNextStep} type="button">
          Add Recipient
        </button>
      </div>
    </div>
  </div>
);

export default VoucherDetailsForm;
