const fetchAPI = async (URL) => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    global.alert(error.message);
  }
};

export default fetchAPI;
