import {axiosInstance} from "../services/axios.service";

export const getAllNotes = async () => {
    const response = await axiosInstance.get('/api/notes')
    return response.data;
}