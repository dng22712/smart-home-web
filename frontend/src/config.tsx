const { VITE_API_HOST: API_HOST, VITE_API_PORT: API_PORT } = import.meta.env;

const API_BASE = API_HOST
    ? (API_PORT ? `${API_HOST}:${API_PORT}` : API_HOST)
    : 'http://0.0.0.0:8001'

export default {
    API_BASE
}