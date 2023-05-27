// import Config from "react-native-config";

const API_BASE_URL = "https://tara-app-onurhnf.onrender.com/api/v1";

export const api = (path: string): string => {
  return `${API_BASE_URL}${path}`;
};
