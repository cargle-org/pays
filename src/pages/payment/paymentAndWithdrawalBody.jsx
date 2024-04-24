import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import MoneyIcon from "../../assets/naira.svg";
import styles from "../../styles/components/paymentpage.module.css";
import { fundWallet } from "../api/payment/fundWallet";
import { getProfile } from "../api/profile/getProfile";
import Loading from "../components/loading";
import { getBanks } from "../api/cashout/getAllBank";
import { withdraw } from "../api/payment/withdraw";
import { Modal, Radio, Divider, Input, Progress, Button } from "antd";
import TransactionHistory from "./transactionHistory";
import getAccountBanks from "../components/nubanChecker";
import axios from "axios";
import { getToken } from "../api/auth/auth";

function PaymentAndWithdrawalBody() {
  const router = useRouter();
  const token = getToken();

  const [operation, setOperation] = useState("deposit");
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bankName, setBankName] = useState([]);
  const [bankCode, setBankCode] = useState("");
  const [suggestedBanks, setSuggestedBanks] = useState([]);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [showAccountDetailsModal, setShowAccountDetailsModal] = useState(false)
  const [showAllBanks, setShowAllBanks] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [accountValidated, setAccountValidated] = useState(false)
  const [showProgressBar, setShowProgressBar] = useState(false)
  const [fetchPercentage, setFetchPercentage] = useState(70)

  const handleOperation = (e) => {
    setOperation(e.target.value);
  };

  const myDeposit = new Intl.NumberFormat().format(depositAmount);
  const myWithdrawal = new Intl.NumberFormat().format(withdrawAmount);

  const [balance, setBalance] = useState("");

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await getProfile();
      setBalance(new Intl.NumberFormat().format(res.walletBalance));
      setIsLoading(false);
      const result = await getBanks();
      setBankName(result);
    })();
  }, []);

  const handleDeposit = async () => {
    setIsLoading(true);
    const res = await fundWallet({ depositAmount });
    const newWindow = window.open(res.response, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
    setIsLoading(false);
  };
  const handleWithdraw = async () => {
    setErrMsg("");
    const res = await withdraw({ withdrawAmount, bankCode, accountNumber });
    if (res) {
      setWithdrawSuccess(true);
    } else {
      setWithdrawSuccess(false);
      setErrMsg("Withdrawal failed, please try again");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const fetchBanks = (accountNumber) => {
    const suggestedBanks = getAccountBanks(accountNumber, bankName && bankName);
    setSuggestedBanks([...suggestedBanks]);
  }

  const getAccountNumber = (e) => {
    const { value } = e.target;
    setAccountNumber(value)
    if (value.length === 10) {
      fetchBanks(value)
      openAccountDetailsModal()
    }
  }

  const handleBankSelection = async (e) => {
    const { code, name } = e.target.value;
    setShowProgressBar(true);
    setBankCode(code);

    axios.get(`https://api.monnify.com/api/v1/disbursements/account/validate?accountNumber=${accountNumber}&bankCode=${code}`,
    {
        headers: {
            'Authorization': 'NX7HYMZPLZ8FGN990T84WW1S39ERQLRR',
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
     if (response?.request.status === 200 && response?.data.responseBody.accountName) {
       setFetchPercentage(100)
       setAccountValidated(true)
       setAccountName(response.data.responseBody.accountName)
       setShowAccountDetailsModal(false)
     }else {
       setAccountValidated(false)
       setFetchPercentage(100)
       setShowAccountDetailsModal(false)
     }
    })
    .catch((error) => {
     setAccountValidated(false)
     setFetchPercentage(100)
     setShowAccountDetailsModal(false)
 });
};

  const openAccountDetailsModal = () => {
    setShowAccountDetailsModal(true);
    setShowProgressBar(false);
    setFetchPercentage(70);
  }

  const closeAccountDetailsModal = () => {
    setShowAccountDetailsModal(false);
    setShowAllBanks(false);
    setFetchPercentage(70);
    setShowProgressBar(false);
  }

  const handleViewAllBanks = () => {
    setShowAllBanks(true);
  }

  const handleSearchInput = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const filterBank = ({ name = "" }) => {
    if (searchValue) {
      if (name.toLowerCase().includes(searchValue)) {
        return true;
      }
      return false;
    }
    return true;
  };

  const disableWithdrawalBTN = () => {
    if (!accountValidated) {
      return true
    }
    if (withdrawAmount === null || withdrawAmount === "") {
      return true
    }
    if (withdrawAmount === "0") {
      return true
    }
    if (parseFloat(balance) < parseFloat(myWithdrawal)) {
      return true
    }
    return false
  }

  const bankData = bankName.filter(filterBank);

  return (
    <div className={styles.payment}>
      <h3>Deposit Withdrawal</h3>
      <h5>
        Balance: <span>₦{balance}</span>
      </h5>
      <div className={styles.container}>
        <div className={styles.type}>
          <div className={styles.one}>
            <input
              type="radio"
              value="deposit"
              name="operation"
              defaultChecked
              onChange={handleOperation}
              style={{ cursor: 'pointer' }}
            />
            <MoneyIcon />
            <span>Deposit cash</span>
          </div>
          <div className={styles.one}>
            <input
              type="radio"
              value="withdraw"
              name="operation"
              onChange={handleOperation}
              style={{ cursor: 'pointer' }}
            />
            <MoneyIcon />
            <span>Withdraw cash</span>
          </div>
        </div>
        {operation === "deposit" ? (
          <div className={styles.deposit}>
            <label>Amount (Minimum of ₦1,000)</label>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="0"
            />
            <button
              onClick={handleDeposit}
              disabled={depositAmount === null || depositAmount === '' || depositAmount < 1000 ? true : false}>Deposit (₦{myDeposit})
            </button>
          </div>
        ) : (
          <div className={styles.withdraw}>
            {!withdrawSuccess ? (
              <div>
                {errMsg ? (
                  <div className={styles.error}>{errMsg}</div>
                ) : (
                  <div> </div>
                )}
                <label>Amount</label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Enter the amount you want to withdraw"
                  max={10}
                />

                <div className={styles.one} style={{ marginTop: '24px' }}>
                  <label>Account Number</label>
                  <input
                    type="number"
                    value={accountNumber}
                    onChange={getAccountNumber}
                    placeholder="Enter account number"
                  />
                </div>
                <div style={{ marginTop: '6px' }}>
                  {fetchPercentage === 100 && accountValidated ?
                    <p style={{ color: 'green' }}>{accountName}</p>
                    :
                    fetchPercentage === 100 && !accountValidated ?
                      <p style={{ color: 'red' }}>Unable to validate account, please try again </p>
                      :
                      ''
                  }
                </div>
                <button
                  onClick={handleWithdraw}
                  disabled={disableWithdrawalBTN()}
                  className={styles.withdrawBtn}
                >
                  Withdraw (₦{myWithdrawal})
                </button>
              </div>
            ) : (
              <div className={styles.message}>
                <img
                  src="https://res.cloudinary.com/dmixz7eur/image/upload/v1677864171/chike/91068-message-sent-successfully-plane_1_dtltch.gif"
                  alt=""
                />
                <h6 style={{ textAlign: "center" }}>Your withdrawal was successful</h6>
                <div className={styles.buttons}>
                  <button onClick={() => router.push("/payment")}>
                    Ok Thanks
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <TransactionHistory />
      <Modal
        bodyStyle={{ maxHeight: "700px", overflowY: 'hidden', overflowX: 'hidden' }}
        open={showAccountDetailsModal}
        footer={null}
        className={styles.accountDetailsModal}
        closable={false}
        centered
        width={500}
        onCancel={closeAccountDetailsModal}
        destroyOnClose
      >
        <div>
          {showProgressBar ?
            <div className={styles.progressBar}>
              <Progress
                percent={fetchPercentage}
                status="active"
                strokeColor="#410d85"
                showInfo={false}
              />
              <p
                style={{
                  color: 'black',
                  fontWeight: '600',
                  justifyContent: 'center',
                  display: 'flex'
                }}
              >Fetching Beneficiary Details
              </p>
              <p
                style={{
                  color: 'black',
                  fontSize: '12px',
                  justifyContent: 'center',
                  display: 'flex',
                  marginTop: '12px'
                }}
              >Please wait...</p>
            </div>
            :
            <Radio.Group
              onChange={handleBankSelection}
              style={{ width: '100%' }}
            >
              <div style={{ marginBottom: '24px' }}>
                <h5 className="">Suggested Banks</h5>
                <p>Select the bank you&apos;re sending to:</p>
                <p className={styles.accountNumberSection}>Account Number: {accountNumber}</p>
                {showAllBanks ?
                  <Input
                    placeholder="Search Banks"
                    style={{ marginTop: '15px' }}
                    onChange={handleSearchInput}
                    value={searchValue}
                  />
                  :
                  ''}
              </div>
              <div
                style={{ height: '550px', overflowY: 'auto', overflowX: 'hidden' }}>
                {showAllBanks ? bankData && bankData.map((bank) => (
                  <React.Fragment key={bank.code}>
                    <Radio value={bank} className="bank-radio">
                      {bank.name}
                    </Radio>
                    <Divider />
                  </React.Fragment>
                ))
                  :
                  suggestedBanks && suggestedBanks.map((bank) => (
                    <React.Fragment key={bank.code}>
                      <Radio value={bank} className="bank-radio">
                        {bank.name}
                      </Radio>
                      <Divider />
                    </React.Fragment>
                  ))
                }
                <div className={styles.viewAllBtn}>
                  {showAllBanks ? '' :
                    <button
                      onClick={handleViewAllBanks}
                    >
                      View All Banks</button>
                  }
                </div>
              </div>
            </Radio.Group>
          }
        </div>

      </Modal>
    </div>
  );
}

export default PaymentAndWithdrawalBody;
