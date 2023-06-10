export const COHORT_NAME = '2303-ftb-et-web-pt';

export const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export const TOKEN = 'Get our Auth Token Dude!';

const fetchData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ${TOKEN}',
        },
    });
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