import React, { useEffect, useState } from "react";
import { getBanks } from "../api/cashout/getAllBank";
import { getAirtimeBillers } from '../api/cashout/getAirtimeBillers';
import styles from "../../styles/components/cashoutvoucher.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Loading from "../components/loading";
import { getAVoucherDetails } from "../api/cashout/getAVoucherDetails";
import { Modal, Radio, Divider, Input, Progress, Button } from "antd";
import getAccountBanks from "../components/nubanChecker";
import Logo from "../../assets/logo.svg";
import axios from "axios";
import { BASE_URL } from "../api/URI/URI_MAP";

function CashoutVoucher() {
  const router = useRouter();

  const [operation, setOperation] = useState('cash');
  const [bankName, setBankName] = useState([]);
  const [bankCode, setBankCode] = useState("");
  const [email, setEmail] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [suggestedBanks, setSuggestedBanks] = useState([]);
  const [fullName, setFullName] = useState("");
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

  const [selectedBank, setSelectedBank] = useState('');

  // Airtime option details
  const [phoneNumber, setPhoneNumber] = useState('');
  const [billerCode, setBillerCode] = useState('');
  const [itemCode, setItemCode] = useState('');

  const [serviceProviders, setServiceProviders] = useState([]);
  const [selectedServiceProvider, setSelectedServiceProvider] = useState('');

  const handleOperation = (e) => {
    setOperation(e.target.value);
  }

  const handleServiceProviderSelect = async (e) => {
    const selectedId = e.target.value;
    setSelectedServiceProvider(selectedId);

    const selectedServiceProviderDetails = serviceProviders.find(airtime_biller => airtime_biller.biller_code === selectedId);
    const { biller_code } = selectedServiceProviderDetails;

    const res = await axios.get(`${BASE_URL}utils/bill-information?biller_code=${biller_code}`, 
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (selectedServiceProviderDetails) {
      setBillerCode(biller_code);
      setItemCode(res.data.data.bill[0].item_code);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getBanks();
      setBankName(res);

      const airtime_billers_res = await getAirtimeBillers({});
      setServiceProviders(airtime_billers_res);
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
  const handleVoucherCashout = async (e) => {
    e.preventDefault()

    setIsLoading(true);

    axios.post(`${BASE_URL}utils/voucher/claim`, {
      fullName: accountName,
      email,
      voucherCode,
      bankCode,
      accountNumber,
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.success === true) {
        setIsLoading(false);
        setEmail('');
        setAccountName('');
        setAccountNumber('');
        const message = 'Your cashout reward has been claimed successfully';
        notify({ message });
        router.push('/cashout/success');
      }
    })
    .catch(error => {
      setIsLoading(false);
      setEmail('');
      setAccountName('');
      setAccountNumber('');
      setErrorMessage(error.response.data.error);
      const message = error.response.data.error;
      notify({ message });
    });
  };

  const handleVoucherRecharge = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    axios.post(`${BASE_URL}utils/voucher/claim-as-airtime`, {
      fullName,
      email,
      voucherCode,
      phone_number: phoneNumber,
      biller_code: billerCode,
      item_code: itemCode
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.success === true) {
        setIsLoading(false);
        setFullName('');
        setEmail('');
        setPhoneNumber('');
        const message = 'Your voucher reward has been claimed successfully';
        notify({ message });
        router.push('/cashout/success');
      }
    })
    .catch(error => {
      setIsLoading(false);
      setFullName('');
      setEmail('');
      setPhoneNumber('');
      setErrorMessage(error.response.data.message);
      const message = error.response.data.message;
      notify({ message });
    });
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

    setSelectedBank(name);

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
                  <button onClick={handleCheckVoucher} disabled={voucherCode === '' ? true : false}>Check Voucher</button>
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

                  <div className={styles.type}>
                    <div className={styles.one}>
                      <input
                        type="radio"
                        value="cash"
                        name="operation"
                        defaultChecked
                        onChange={handleOperation}
                        style={{ cursor: 'pointer' }}
                      />
                      <span>Cash</span>
                    </div>
                    <div className={styles.one}>
                      <input
                        type="radio"
                        value="airtime"
                        name="operation"
                        onChange={handleOperation}
                        style={{ cursor: 'pointer' }}
                      />
                      <span>Airtime</span>
                    </div>
                  </div>

                  {operation == 'cash' ? (
                    <>
                      <div
                        className={styles.one}
                        style={{ marginTop: '6px' }}
                      >
                        <label>Email</label>
                        <input
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                        />
                      </div>
                        
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
                        
                      <div
                        className={styles.one}
                        style={{ marginTop: '6px' }}
                      >
                        <label>Account Name</label>
                        <input
                          placeholder="Account name"
                          value={accountName}
                          type="text"
                          readOnly
                        />
                      </div>

                      <div className={styles.one}>
                        <label>Bank</label>
                        <input
                          placeholder="Bank"
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value.name)}
                          type='text'
                          readOnly
                        />
                      </div>

                      <button onClick={handleVoucherCashout} disabled={accountNumber === '' || email === '' ? true : false}>
                        Cashout Voucher
                      </button>
                    </>
                  ): (
                    <>
                      <div className={styles.one}>
                        <label>Full name</label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter full name"
                        />
                      </div>

                      <div className={styles.one}>
                        <label>Email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter email"
                        />
                      </div>    
                          
                      <div className={styles.one}>
                        <label>Phone Number</label>
                        <input
                          type="number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Enter phone number"
                        />
                      </div>
                          
                      <div
                        className={styles.one}
                        style={{ marginTop: '6px' }}
                      >
                        <label>Service Provider</label>
                          <select value={selectedServiceProvider} onChange={handleServiceProviderSelect}>
                            <option value=''>Select a service provider</option>
                            {serviceProviders?.map(({ biller_code, name }) => <option value={biller_code} key={biller_code}>{name}</option>)}
                          </select>
                      </div>

                      <button onClick={handleVoucherRecharge} disabled={phoneNumber === '' || selectedServiceProvider === '' ? true : false}>
                        Cashout Voucher as airtime
                      </button>
                    </>
                  )}

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
                            <h5>Suggested Banks</h5>
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
              <img src="https://res.cloudinary.com/dmixz7eur/image/upload/v1681288615/chike/pexels-ketut-subiyanto-4559951_y7tzis.jpg" alt="" style={{ objectFit: 'cover' }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CashoutVoucher;
