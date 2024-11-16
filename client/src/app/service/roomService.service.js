import axios from "axios";
import config from "../config.json";

const httpAuth = axios.create({
  baseURL: config.apiEndpoint,
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});
const roomService = {
  getAllRooms: async () => {
    try {
      const response = await httpAuth.get("/rooms");

      return response.data;
    } catch (error) {
      console.error("Ошибка при получении комнат", error);
    }
    throw new Error("Ошибка при получении комнат");
  },
  getById: async (id) => {
    try {
      const response = await httpAuth.get(`/rooms/${id}`);

      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении комнаты с id: ${id}`, error);
      throw new Error(`Не удалось получить комнату с id: ${id}`);
    }
  },
};

export default roomService;
