import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/"

export const transportService = {
    getAll: () => axios.get('transport').then(d => d.data),
    getById: (id: number) => axios.get(`transport/${id}`).then(d => d.data)
}