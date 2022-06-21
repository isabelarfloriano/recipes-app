const fetchAPI = async (URL) => {
  const response = await fetch(URL);
  console.log(URL);
  const data = await response.json();
  console.log(await data);
};

export default fetchAPI;
