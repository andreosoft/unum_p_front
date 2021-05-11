const BASE_URL = "http://api.neomedy.com/api";

export default {
  baseUrl: BASE_URL,
  config: BASE_URL + "/config",
  token_login: BASE_URL + "/signup/get_token",
  set_profile: BASE_URL + "/signup/set_profile",
  get_profile: BASE_URL + "/signup/get_profile",
  registration: BASE_URL + "/signup/registration/doctor",
  activation: BASE_URL + "/signup/activation",
  file_upload: BASE_URL + "/file/upload",
  file_download: BASE_URL + "/file/download",
  image_upload: BASE_URL + "/image/upload",
  image_download: BASE_URL + "/image/download",
  basic: BASE_URL + "/basic",

  users: BASE_URL + "/users",

  patients: BASE_URL + "/unum/patients",
  doctors: BASE_URL + "/unum/doctors",
  schedule: BASE_URL + "/unum/schedule",
  visits: BASE_URL + "/unum/clinical_records"
};
