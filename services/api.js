import axios from "axios";

const BASE_URL = "http://192.168.31.38:5000";

export const uploadPDF = async (formData) => {

  try {

    console.log("Sending PDF...");

    const response = await axios.post(
      `${BASE_URL}/upload`,
      formData,
      
    );

    console.log("Backend Response:", response.data);

    return response.data;

  } catch (error) {

    console.log("UPLOAD ERROR:", error);

    return null;
  }
};