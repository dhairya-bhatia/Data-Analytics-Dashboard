const makeApiCall = async (url, paramsObj = {}) => {
  try {
    let response = await fetch(url, paramsObj);
    let json = await response.json();
    return json;
  } catch (error) {
    return { error };
  }
};

export default makeApiCall;
