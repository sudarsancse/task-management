import { API_PATH } from "./apiPath";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const fromData = new FormData();
  // Append image file to from data
  fromData.append("image", imageFile);

  try {
    const res = await axiosInstance.post(
      API_PATH.IMAGE.UPLOADE_IMAGE,
      fromData,
      {
        headers: {
          "Content-Type": "multipart/from-data", // Set header for file upload
        },
      }
    );

    return res.data; // Return respose data
  } catch (error) {
    console.error("Error uploading the image: ", error);
    throw error; //Rethrow error for handeling
  }
};

export default uploadImage;
