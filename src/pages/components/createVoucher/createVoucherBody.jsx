import React from "react";
import styles from "../../../styles/components/createvoucherpage.module.css";
import Camera from "../../../assets/camera.svg";
import { useState } from "react";
import { createVoucher } from "@/pages/api/vouchers/createVoucher";
import { useRouter } from "next/router";
import Loading from "../loading";
import Back from "../../../assets/back.svg";

function CreateVoucherBody() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [voucherKey, setVoucherKey] = useState("");
  const [errMSG, setErrMSG] = useState("");
  const [voucherThumbnail, setVoucherThumbnail] = useState("");
  const [cmgThumbnail, setcmgThumbnail] = useState(
    "https://res.cloudinary.com/dmixz7eur/image/upload/v1681749139/5fcf0eb48684a01b5a30caff0896a2f8_qzi2jp.jpg"
  );
  const [noOfVouchers, setNoOfVouchers] = useState(0);
  const [amountPerVoucher, setAmountPerVoucher] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileInputChange = (event) => {
    setVoucherThumbnail(event.target.files[0]);
    setcmgThumbnail(URL.createObjectURL(event.target.files[0]));
  };

  const cmgFee = new Intl.NumberFormat().format(noOfVouchers * 10);
  const subTotalAmount = new Intl.NumberFormat().format(
    noOfVouchers * amountPerVoucher
  );
  const total = noOfVouchers * amountPerVoucher + noOfVouchers * 10;
  const totalAmount = new Intl.NumberFormat().format(total);

  const handleCreateVoucher = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("thumbnail", voucherThumbnail);
    formData.append("description", description);
    formData.append("totalNumberOfVouchers", noOfVouchers);
    formData.append("amountPerVoucher", amountPerVoucher);
    formData.append("voucherKey", voucherKey);
    if (title === "" || description === "" || voucherKey === "") {
      setErrMSG("one or more field cannot be empty ");
    } else if (noOfVouchers === 0 || amountPerVoucher === 0) {
      setErrMSG("number or vouchers or amount per voucher cannot be empty");
    } else if (voucherKey.length !== 5) {
      setErrMSG("your voucher key must be five character");
    } else {
      setIsLoading(true);
      const res = await createVoucher({ formData });
      if (res.voucher) {
        setIsLoading(false);
        router.push({
          pathname: "/voucher/[individualVoucherPage]",
          query: {
            individualVoucherPage: res.voucher._id,
          },
        });
      } else if (res.message) {
        setIsLoading(false);
        setErrMSG(res.message);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={styles.createVoucherPage}>
      <div className={styles.container}>
        <form>
          <div className={styles.colOne}>
            <div className={styles.back} onClick={() => router.back()}>
              <Back /> Back
            </div>
            <div className={styles.title}>
              <h2>Create Vouchers</h2>
            </div>
            <div className={styles.content}>
              {errMSG ? (
                <div className={styles.error}>{errMSG}</div>
              ) : (
                <div></div>
              )}
              <label>Title</label>
              <input
                placeholder="Enter voucher title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
              />
              {/* <label>Thumbnail/image/banner (5 by 6)</label> */}

              <label>Description</label>
              <textarea
                placeholder="Enter voucher description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <label>Voucher Key</label>
              <input
                value={voucherKey}
                placeholder="Enter five unique letter for your voucher key"
                onChange={(e) => setVoucherKey(e.target.value)}
                type="text"
              />
              <div className={styles.sortAmount}>
                <div className={styles.input}>
                  <label>Number of vouchers</label>
                  <input
                    value={noOfVouchers}
                    onChange={(e) => setNoOfVouchers(e.target.value)}
                    type="text"
                  />
                </div>
                <div className={styles.input}>
                  <label>Amount per voucher</label>
                  <input
                    value={amountPerVoucher}
                    onChange={(e) => setAmountPerVoucher(e.target.value)}
                    type="text"
                  />
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
              <button onClick={handleCreateVoucher}>
                Create Vouchers of (₦{totalAmount})
              </button>
            </div>
          </div>
          <div className={styles.colTwo}>
            <div className={styles.thumbnail}>
              {!voucherThumbnail ? (
                <img src={cmgThumbnail} alt="" />
              ) : (
                <img src={cmgThumbnail} alt="" />
              )}
              <label className={styles.btn}>
                <Camera />
                <p>choose thumbnail</p>
                <input onChange={handleFileInputChange} type="file" />
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateVoucherBody;
