const BASE_URL = "https://usepays-api.herokuapp.com/api/";


const URI_MAP = {
  cmg: {
    register: `${BASE_URL}auth/register`,
    login: `${BASE_URL}auth/login/`,
    create_voucher: `${BASE_URL}utils/voucher/create`,
    fund_wallet: `${BASE_URL}utils/wallet/fund`,
    withdraw_from_wallet: `${BASE_URL}utils/wallet/withdraw`,
    verify_payment: `${BASE_URL}utils/wallet/verifyTrx`,
    verify_account: `${BASE_URL}auth/verify`,
    get_profile: `${BASE_URL}user/one`,
    get_all_vouchers: `${BASE_URL}user/vouchers/all`,
    get_one_voucher: `${BASE_URL}user/vouchers/one`,
    get_all_banks: `${BASE_URL}utils/banks/all`,
    cashout_a_voucher: `${BASE_URL}utils/voucher/claim`,
    forgot_password: `${BASE_URL}auth/forgot-password`,
    reset_password: `${BASE_URL}auth/reset-password`,
    fetch_a_voucher_details: `${BASE_URL}utils/voucher/one`,
    edit_profile: `${BASE_URL}user/edit`,
    // pickup_delivery: `${BASE_URL}deliveries/select`,
    // get_all_deliveries: `${BASE_URL}deliveries`,
    // assign_delivery: `${BASE_URL}deliveries/assign`,
    // reassign_delivery: `${BASE_URL}deliveries/reassign`,
    // remove_Rider_Delivery: `${BASE_URL}deliveries/remove`,
    // admin_my_delivery: `${BASE_URL}deliveries`,
    // riders: `${BASE_URL}riders`,
    // upload_Ddelivery_file: `${BASE_URL}deliveries/add`,
    // create_delivery: `${BASE_URL}deliveries/new`,
  },
};

export default URI_MAP;