const BASE_URL = "https://cmg-api.onrender.com/api/";


const URI_MAP = {
  cmg: {
    register: `${BASE_URL}auth/register`,
    login: `${BASE_URL}auth/login/`,
    create_voucher: `${BASE_URL}utils/voucher/create`,
    fund_wallet: `${BASE_URL}utils/wallet/fund`,
    verify_payment: `${BASE_URL}utils/wallet/verifyTrx`,
    verify_account: `${BASE_URL}auth/verify`,
    get_profile: `${BASE_URL}user/one`,
    // update_delivery_status: `${BASE_URL}deliveries/update`,
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