import axios from 'axios';

export const fetchMusicData = async () => {
  try {
    const response = await axios.get('https://cms.samespace.com/items/songs');
    return response.data.data;
  } catch (error) {
    console.error("Error fetching music data", error);
    return [];
  }
};
