import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Her isteğe Access Token'ı ekle
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// NOT: Token yenileme (refresh) mantığı için daha karmaşık bir response interceptor
// eklenebilir, ancak başlangıç için bu yapı yeterlidir.

export default apiClient;
