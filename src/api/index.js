export const COHORT_NAME = '2303-ftb-et-web-pt';

export const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export const KEY = "";

export const setToken = '';

/* const fetchData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
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
})(); */

/* 
const fetchPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      // Handle the received data
    } else {
      throw new Error('Failed to fetch posts');
    }
  } catch (error) {
    console.log('Error fetching posts:', error);
  }
};

fetchPosts(); */