// import Config from "react-native-config";

const API_BASE_URL = "http://192.168.43.26:8080/api/v1";

export const api = (path: string): string => {
  return `${API_BASE_URL}${path}`;
};
