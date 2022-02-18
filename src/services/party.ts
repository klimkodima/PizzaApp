import { apiBaseUrl } from "../constants";

const getResource = async (querry: string) => {
  try {
    const response = await fetch(apiBaseUrl + querry);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const partyServise = { getResource };

export default partyServise;