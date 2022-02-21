// export const API_URL = 'https://mutineers1.herokuapp.com/api';
export const API_URL = "/api";

export const callApi = async ({ url, method, token, body }) => {
  //console.log('callApi: ', { url, method, token, body });
  try {
    const options = {
      method: method ? method.toUpperCase() : "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log("Call API Request URL: ", API_URL + url);
    console.log("Call API Options: ", options);
    const response = await fetch(API_URL + url, options);
    const data = await response.json();
    console.log("data: ", data);
    if (data.error) throw data.error;
    return data;
  } catch (error) {
    console.error("ERROR: ", error);
  }
};
