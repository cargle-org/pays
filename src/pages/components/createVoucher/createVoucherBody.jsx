import React from "react";
import styles from "../../../styles/components/createvoucherpage.module.css";
import Camera from "../../../assets/camera.svg";
import { useState } from "react";
import { useRouter } from "next/router";
import Loading from "../loading";
import Back from "../../../assets/back.svg";
import Excel from '../../../assets/excel.svg';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BASE_URL } from "../../api/URI/URI_MAP";
import { getToken } from "../../api/auth/auth";
import * as XLSX from 'xlsx'; // Import xlsx library for Excel file parsing
import { FaTrash } from 'react-icons/fa';

function CreateVoucherBody() {
  const router = useRouter();
  const token = getToken();

  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [voucherKey, setVoucherKey] = useState("");
  const [expiryDate, setExpiryDate] = useState('');
  const [errMSG, setErrMSG] = useState("");
  const [voucherThumbnail, setVoucherThumbnail] = useState("");
  const [cmgThumbnail, setcmgThumbnail] = useState(
    "/createVoucher.svg"
  );
  const [noOfVouchers, setNoOfVouchers] = useState(0);
  const [amountPerVoucher, setAmountPerVoucher] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Recipient form details
  const [operation, setOperation] = useState('manually');
  const [recipients, setRecipients] = useState([]);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  // State variable for error message
  const [amountError, setAmountError] = useState("");

  // State variable for email error message
  const [emailError, setEmailError] = useState("");

  // Handler for amount per voucher change
  const handleAmountPerVoucherChange = (e) => {
    const amount = e.target.value;
    setAmountPerVoucher(amount);

    // Check if amount per voucher is less than the minimum
    if (amount < 100) {
      setAmountError("min 100.");
    } else {
      setAmountError("");
    }
  };

  const notify = ({ message }) => toast(message);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFileInputChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setVoucherThumbnail(event.target.files[0]);
      setcmgThumbnail(URL.createObjectURL(event.target.files[0]));
    }
  };
  
  const handleOperation = (e) => {
    setOperation(e.target.value);
  }

  const cmgFee = new Intl.NumberFormat().format(noOfVouchers * 10);
  const subTotalAmount = new Intl.NumberFormat().format(
    noOfVouchers * amountPerVoucher
  );
  const total = noOfVouchers * amountPerVoucher + noOfVouchers * 10;
  const totalAmount = new Intl.NumberFormat().format(total);

  // Function to handle bulk recipient upload
  const handleBulkRecipientUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      // Extract required columns and update recipients state
      const updatedRecipients = parsedData.map((row) => ({
        name: row.name,
        phoneNumber: row.phoneNumber,
        email: row.email
      }));
      setRecipients(updatedRecipients);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleCreateVoucher = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const newRecipient = { name, email, phone_number: phoneNumber };
    setRecipients(r => [...r, newRecipient]);
    const updatedRecipients = [...recipients, newRecipient];

    axios.post(`${BASE_URL}utils/voucher/create`, {
      title,
      description,
      voucherKey,
      // Use a ternary operator to conditionally include expiry_date based on its value
      ...(expiryDate !== '' && { expiry_date: expiryDate }),
      totalNumberOfVouchers: noOfVouchers,
      amountPerVoucher,
      recipients: updatedRecipients
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${token}`,
      }
    })
    .then(res => {
      setIsLoading(false);
      if (res && res.data && res.data.success) {
        const message = res.data.message;
        const voucherId = res.data.voucher._id;
        notify({ message });
        // Check if the current route is '/createvouchers' before redirecting
        if (router.pathname !== '/createvouchers') {
          router.push(`/voucher/${voucherId}`);
        } else {
          // Reset form fields if already on the createvouchers page
          setTitle('');
          setDescription('');
          setVoucherKey('');
          setExpiryDate('');
          setNoOfVouchers(0);
          setAmountPerVoucher(0);
        }
      } else {
        const errorMessage = res.data ? res.data.message : 'An error occurred';
        setErrMSG(errorMessage);
        notify({ message: errorMessage });
      }
    })
    .catch(error => {
      setIsLoading(false);  
      setTitle('');
      setDescription('');
      setVoucherKey('');
      setExpiryDate('');
      setNoOfVouchers(0);
      setAmountPerVoucher(0);
      setErrMSG(error.response.data.error);
      const message = error.response.data.error;
      notify({ message });
    })
  }

  const handleAddRecipient = async (e) => {
    e.preventDefault();

    // Validate email field
    if (!email.trim()) {
      setEmailError("Email is required.");
      return;
    } else {
      setEmailError(""); // Clear email error if email is provided
    }

    const newRecipient = { name, email: email.trim(), phone_number: phoneNumber };
    setRecipients(prevRecipients => [...prevRecipients, newRecipient]);

    setName('');
    setEmail('');
    setPhoneNumber('');
  }

  const handleRemoveRecipient = (index) => {
    setRecipients(prevRecipients => prevRecipients.filter((_, i) => i !== index));
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={styles.createVoucherPage}>
      <div className={styles.container}>
        <form>
          {currentStep === 1 && (
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
                      // onChange={(e) => setAmountPerVoucher(e.target.value)}
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
                    disabled={totalAmount === '0' || voucherKey === '' || amountPerVoucher === 0 || title === '' ? true : false}
                  >
                    Create Voucher
                  </button>
                  <button onClick={handleNextStep} type='button'>Add Recipient</button>
                </div>
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className={styles.colOne}>
              <div className={styles.addRecipientPage}>
                <div className={styles.back} onClick={handlePrevStep}>
                  <Back /> Back
                </div>

                <div className={styles.title}>
                  <h2>Add Recipient</h2>
                </div>
                <div className={styles.type}>
                  <div className={styles.one}>
                    <input
                      type="radio"
                      value="manually"
                      name="operation"
                      defaultChecked
                      onChange={handleOperation}
                      style={{ cursor: 'pointer' }}
                    />
                    <span>Manually</span>
                  </div>
                  <div className={styles.one}>
                    <input
                      type="radio"
                      value="batchupload"
                      name="operation"
                      onChange={handleOperation}
                      style={{ cursor: 'pointer' }}
                    />
                    <span>Batch Upload</span>
                  </div>
                </div>
                {operation == 'manually' ? (
                  <div className={styles.content}>
                    {errMSG ? (
                      <div className={styles.error}>{errMSG}</div>
                    ) : (
                      <div></div>
                    )}
                    
                    <label>Recipient Name</label>
                    <input
                      placeholder="Enter Recipient Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                    />

                    <label>Recipient Phone Number</label>
                    <input
                      placeholder="Enter Recipient Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      type="tel"
                    />

                    <label>Recipient Email</label>
                    <input
                      placeholder="Enter Recipient Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                    />
                    {emailError && <div className={styles.error}>{emailError}</div>}

                    <button 
                      onClick={handleAddRecipient}
                    >
                      &rarr; Add
                    </button>

                    <div id={styles.table}>
                      <table>
                        <thead>
                          <tr>
                            <th>S/N</th>
                            {/* <th>Name</th>
                            <th>Phone Number</th> */}
                            <th>Email Address</th>
                            <th>Action</th>
                          </tr>
                          {recipients.map((recipient, index) => <tr key={index}>
                            <td>{index + 1}</td>
                            {/* <td>{recipient.name}</td>
                            <td>{recipient.phone_number}</td> */}
                            <td>{recipient.email}</td>
                            <button onClick={() => handleRemoveRecipient(index)}><FaTrash /></button>
                          </tr>)}
                        </thead>
                      </table>
                    </div>

                    <button 
                      onClick={handleCreateVoucher} 
                      disabled={totalAmount === '0' || voucherKey === '' || amountPerVoucher === 0 || title === '' ? true : false}
                    >
                      Create Voucher
                    </button>
                  </div>
                ): (
                  <div className={styles.content}>
                    {errMSG ? (
                      <div className={styles.error}>{errMSG}</div>
                    ) : (
                      <div></div>
                    )}

                    <div className={styles.excelUpload}>
                      <Excel />
                      <label className={styles.btn}>
                        <p>Upload Excel Document</p>
                        <span>Click here to select a document</span>
                        <input onChange={handleBulkRecipientUpload} type="file" />
                      </label>
                    </div>

                    <div id={styles.table}>
                      <table>
                        <thead>
                          <tr>
                            <th>S/N</th>
                            {/* <th>Name</th>
                            <th>Phone Number</th> */}
                            <th>Email Address</th>
                            <th>Action</th>
                          </tr>
                          {recipients.map((recipient, index) => <tr key={index}>
                            <td>{index + 1}</td>
                            {/* <td>{recipient.name}</td>
                            <td>{recipient.phone_number}</td> */}
                            <td>{recipient.email}</td>
                            <button onClick={() => handleRemoveRecipient(index)}><FaTrash /></button>
                          </tr>)}
                        </thead>
                      </table>
                    </div>

                    <button onClick={() => router.push('/createvouchers')} type='button'>Create Voucher</button>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className={styles.colTwo}>
            <div className={styles.thumbnail}>
              {!voucherThumbnail ? (
                <img src={cmgThumbnail} alt="voucher-card"/>
              ) : (
                <img src={cmgThumbnail} alt="voucher-card" />
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
