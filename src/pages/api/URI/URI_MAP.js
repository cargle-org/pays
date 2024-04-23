 export const BASE_URL = "https://cashmygift-api-production-a5e6.up.railway.app/api/";

 
const URI_MAP = {
  cmg: {
    register: `${BASE_URL}auth/register`,
    login: `${BASE_URL}auth/login`,
    create_voucher: `${BASE_URL}utils/voucher/create`,
    fund_wallet: `${BASE_URL}utils/wallet/fund`,
    withdraw_from_wallet: `${BASE_URL}utils/wallet/withdraw`,
    verify_payment: `${BASE_URL}utils/wallet/verifyTrx`,
    verify_account: `${BASE_URL}auth/verify`,
    get_profile: `${BASE_URL}user/one`,
    get_all_vouchers: `${BASE_URL}user/vouchers/all`,
    get_one_voucher: `${BASE_URL}user/vouchers/one`,
    get_all_banks: `${BASE_URL}utils/banks/all`,
    get_all_transactions: `${BASE_URL}utils/transactions/all`,
    cashout_a_voucher: `${BASE_URL}utils/voucher/claim`,
    cashout_a_voucher_as_airtime: `${BASE_URL}utils/voucher/claim-as-airtime`,
    forgot_password: `${BASE_URL}auth/forgot-password`,
    reset_password: `${BASE_URL}auth/reset-password`,
    change_password: `${BASE_URL}auth/change-password`,
    fetch_a_voucher_details: `${BASE_URL}utils/voucher/one`,
    edit_profile: `${BASE_URL}user/edit`,
    contact_us: `${BASE_URL}utils/contact-us`,
    create_link: `${BASE_URL}utils/links/create`,
    pay_to_link: `${BASE_URL}utils/links/pay`,
    get_all_links: `${BASE_URL}utils/user/links`,
    get_categories: `${BASE_URL}utils/links/categories`,
    get_airtime_billers: `${BASE_URL}utils/airtime-billers`
  },
};

export default URI_MAP;