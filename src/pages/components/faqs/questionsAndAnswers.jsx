import React, { useState } from "react";
import styles from "../../../styles/components/faqs.module.css";

function QuestionsAndAnswers() {
  const [activeQuestion, setActiveQuestion] = useState(1);

  return (
    <div className={styles.faqs}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>FAQs</h2>
          <div className={styles.flex}>
            <div className={styles.questions}>
              <div
                onClick={() => setActiveQuestion(1)}
                className={activeQuestion === 1 ? styles.active : styles.one}
              >
                How does the gift voucher work?
              </div>
              <div
                onClick={() => setActiveQuestion(2)}
                className={activeQuestion === 2 ? styles.active : styles.one}
              >
                Can I customize the gift voucher?
              </div>
              <div
                onClick={() => setActiveQuestion(3)}
                className={activeQuestion === 3 ? styles.active : styles.one}
              >
                Is there an expiration date for the gift voucher?
              </div>
              <div
                onClick={() => setActiveQuestion(4)}
                className={activeQuestion === 4 ? styles.active : styles.one}
              >
                Can I get a refund for a gift voucher?
              </div>
              <div
                onClick={() => setActiveQuestion(5)}
                className={activeQuestion === 5 ? styles.active : styles.one}
              >
                Is there a minimum purchase amount required to use the gift
                voucher?
              </div>
            </div>
            <div className={styles.answers}>
              {activeQuestion === 1 && (
                <h6>
                  Our gift vouchers are electronic and can be created and
                  redeemed online. Once you create a gift voucher, it will be
                  sent to the recipient via email with instructions on how to
                  redeem it. The recipient can then cash out the gift voucher
                </h6>
              )}
              {activeQuestion === 2 && (
                <h6>
                  Yes, you can customize the gift voucher with a personal
                  message and the recipient's name.
                </h6>
              )}
              {activeQuestion === 3 && (
                <h6>
                  Yes, our gift vouchers typically have an expiration date of 5
                  years from the date of purchase
                </h6>
              )}
              {activeQuestion === 4 && (
                <h6>
                  If the gift voucher has not been redeemed, you can cancel the
                  gift voucher and the value will be refunded to your usepays.co
                  wallet.
                </h6>
              )}
              {activeQuestion === 5 && (
                <h6>
                  No, there is no minimum purchase amount required to use the
                  gift voucher.
                </h6>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionsAndAnswers;
