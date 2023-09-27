import axios from "axios";
import URI_MAP from "../URI/URI_MAP";

export const getCategories = async () => {
  try {
    const response = await axios.get(`${URI_MAP.cmg.get_categories}`);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};