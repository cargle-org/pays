import React, { useEffect, useState } from "react";
import { getBanks } from "../api/cashout/getAllBank";
import styles from "../../styles/components/cashoutvoucher.module.css";
import { cashoutVoucher } from "../api/cashout/cashoutVoucher";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Loading from "../components/loading";
import { getAVoucherDetails } from "../api/cashout/getAVoucherDetails";
import { Modal, Radio, Divider, Input, Progress, Button } from "antd";
import nubanChecker from "../components/nubanChecker";
import axios from "axios";
import Logo from "../../assets/logo.svg";

function CashoutVoucher() {
  const router = useRouter();

  const [bankName, setBankName] = useState([]);
  const [bankCode, setBankCode] = useState("");
  const [email, setEmail] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [suggestedBanks, setSuggestedBanks] = useState([]);
  const [otherBanks, setOtherBanks] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [voucherIsFetched, setVoucherIsFetched] = useState(false);
  const notify = ({ message }) => toast(message);
  const [voucherDetails, setVoucherDetails] = useState("");
  const [showAccountDetailsModal, setShowAccountDetailsModal] = useState(false)
  const [showAllBanks, setShowAllBanks] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [accountValidated, setAccountValidated] = useState(false)
  const [showProgressBar, setShowProgressBar] = useState(false)
  const [fetchPercentage, setFetchPercentage] = useState(70)

  useEffect(() => {
    (async () => {
      const res = await getBanks();
      setBankName(res);
    })();
  }, []);

  const handleCheckVoucher = async () => {
    const result = await getAVoucherDetails({ voucherCode });
    if (result.success) {
      setVoucherIsFetched(true);
      setVoucherDetails(result.data.voucher);
    } else {
      setErrorMessage(
        "An error occurred, please check your voucher code and try again"
      );
    }
  };
  const handleCashoutVoucher = async () => {
    const fullName = accountName;
    setIsLoading(true);
    const res = await cashoutVoucher({
      fullName,
      accountNumber,
      voucherCode,
      bankCode,
      email,
    });
    if (res.success === true) {
      setIsLoading(false);
      const message = "Your Voucher reward has been claimed successfully";
      notify({ message });
      router.push("/cashout/success");
    } else {
      setIsLoading(false);
      setErrorMessage(res.message);
      const message = res.message;
      notify({ message });
    }
  };
  if (isLoading) {
    return <Loading />;
  }

  const fetchBanks = (accountNumber) => {
    const { suggestedBanks = [], otherBanks = [] } = nubanChecker.getAccountBanks(accountNumber, bankName);
    setSuggestedBanks([...suggestedBanks]);
    setOtherBanks([...otherBanks]);
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

    try {
      const response = await axios.get(`https://maylancer.org/api/nuban/api.php?account_number=${accountNumber}&bank_code=${code}`);
      if (response?.status === 200 && response?.data.account_name) {
        setFetchPercentage(100)
        setAccountValidated(true)
        setAccountName(response.data.account_name)
        setShowAccountDetailsModal(false)
      } else {
        setAccountValidated(false)
        setFetchPercentage(100)
        setShowAccountDetailsModal(false)
      }
    } catch (error) {
      console.log("error", error);
    }
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

  const bankData = bankName.filter(filterBank);


  return (
    <div className={styles.cashout}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.colTwo}>
            <div className={styles.logo} onClick={() => router.push("/")}>
              <Logo />
            </div>
            <div className={styles.details}>
              {!voucherIsFetched ? (
                <div>
                  <h3>Redeem your gift vouchers</h3>
                  <p>
                    Got unused gift vouchers? We’ve got you covered. Just type
                    in a few details to exchange your vouchers for cash and get
                    credited immediately.
                  </p>
                  <br />
                  {errorMessage ? (
                    <div className={styles.error}>{errorMessage}</div>
                  ) : (
                    <div> </div>
                  )}
                  <div className={styles.one}>
                    <label>Voucher Code</label>
                    <input
                      type="text"
                      value={voucherCode}
                      onChange={(e) => {
                        setVoucherCode(e.target.value);
                        setErrorMessage("");
                      }}
                      placeholder="Enter your voucher code e.g XXX-638-hs8wn"
                    />
                  </div>
                  <button onClick={handleCheckVoucher}>Check Voucher</button>
                </div>
              ) : (
                <div>
                  <ToastContainer />
                  <div className={styles.card}>
                    <h3>{voucherDetails?.title}</h3>
                    <p>{voucherDetails?.description}</p>
                    <div className={styles.detail}>
                      <h5>{voucherCode}</h5>
                      <p>Amount</p>
                      <h2>₦{voucherDetails?.amount}</h2>
                    </div>
                  </div>
                  <br />
                  <div className={styles.one}>
                    {errorMessage ? (
                      <div className={styles.error}>{errorMessage}</div>
                    ) : (
                      <div> </div>
                    )}
                  </div>
                  {/* <div className={styles.one}>
                    <label>Full Account Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full account name"
                    />
                  </div> */}
                  <div className={styles.one}>
                    <label>Account Number</label>
                    <input
                      type="number"
                      value={accountNumber}
                      onChange={getAccountNumber}
                      placeholder="Enter account number"
                    />
                    <div>
                      {fetchPercentage === 100 && accountValidated ?
                        <p style={{ color: 'green' }}>{accountName}</p>
                        :
                        fetchPercentage === 100 && !accountValidated ?
                          <p style={{ color: 'red' }}>Unable to validate account, please try again </p>
                          :
                          ''
                      }
                    </div>
                  </div>

                  {/* <div className={styles.one}>
                    <label>Bank</label>
                    <select
                      name="banks"
                      value={bankCode}
                      onChange={(e) => setBankCode(e.target.value)}
                    >
                      <option value="">select a bank</option>
                      {bankName?.map((banks) => (
                        <option key={banks.id} value={banks.code}>
                          {banks.name}
                        </option>
                      ))}
                    </select>
                  </div> */}
                  <div
                    className={styles.one}
                    style={{ marginTop: '6px' }}
                  >
                    <label>Email Address</label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                    />
                  </div>
                  <button onClick={handleCashoutVoucher}>
                    Cashout Voucher
                  </button>
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
                            <p>Select the bank you're sending to:</p>
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
              )}
            </div>
          </div>
          <div className={styles.colOne}>
            {!voucherIsFetched ? (
              <img
                src="https://res.cloudinary.com/dmixz7eur/image/upload/v1681288615/chike/pexels-ketut-subiyanto-4559951_y7tzis.jpg"
                alt=""
              />
            ) : (
              <img src={voucherDetails?.thumbnail} alt="" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CashoutVoucher;
