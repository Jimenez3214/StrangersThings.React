const COHORT_NAME = '2303-ftb-et-web-pt';

export const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const fetchData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const data = await response.json();
    console.log('Returned data:', data);
    return data;
  } catch (error) {
    console.log('Error fetching data:', error);
  }
};

(async () => {
  await fetchData();
})();