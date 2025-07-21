import axios from "axios";

export async function onBoard(token, data) {
  try {
    const response = await axios({
      method: "post",
      url: "",
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    // Handle the error appropriately
    console.error("There was an error!", error);
  }
}
