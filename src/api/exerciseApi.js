const API_KEY = "goMv7PGtahMBIU4XG3jlBw==JMjv7gqLrbcfVj9o";
const BASE_URL = "https://api.api-ninjas.com/v1/exercises";

export const fetchExercises = async (queryParams = {}) => {
  try {
    const validParams = {};
    if (queryParams.name) validParams.name = queryParams.name;
    if (queryParams.muscle) validParams.muscle = queryParams.muscle;
    if (queryParams.type) validParams.type = queryParams.type;
    if (queryParams.difficulty) validParams.difficulty = queryParams.difficulty;

    const queryString = new URLSearchParams(validParams).toString();
    const url = `${BASE_URL}?${queryString}`;

    console.log("Fetching exercises from:", url);

    const response = await fetch(url, {
      headers: { "X-Api-Key": API_KEY },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Exercise Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
};
