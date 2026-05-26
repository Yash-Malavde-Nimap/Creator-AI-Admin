import axios from 'axios';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { getToken, removeToken } from '../utils/auth';
import toast from '../utils/toast';

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) ?? '/api';

// ── Shared error handler ──────────────────────────────────────────────────────
// Normalises every error response into a plain Error with a readable message.

function handleResponseError(error: AxiosError): Promise<never> {
  if (!error.response) {
    const message = 'Network error. Please check your connection.';
    toast.error(message);
    return Promise.reject(new Error(message));
  }

  const { status } = error.response;
  const serverMessage = (error.response.data as { message?: string })?.message;

  const errorMessages: Record<number, string> = {
    400: serverMessage ?? 'Bad request.',
    403: 'You do not have permission to perform this action.',
    404: 'The requested resource was not found.',
    422: serverMessage ?? 'Validation failed.',
  };

  if (status in errorMessages) {
    toast.error(errorMessages[status]);
    return Promise.reject(new Error(errorMessages[status]));
  }

  if (status === 429) {
    const message = 'Too many requests. Please slow down.';
    toast.warning(message);
    return Promise.reject(new Error(message));
  }

  if (status >= 500) {
    const message = 'A server error occurred. Please try again later.';
    toast.error(message);
    return Promise.reject(new Error(message));
  }

  const fallback = serverMessage ?? 'An unexpected error occurred.';
  toast.error(fallback);
  return Promise.reject(new Error(fallback));
}

// ── Shared instance factory ───────────────────────────────────────────────────

function createInstance(): AxiosInstance {
  return axios.create({
    baseURL: BASE_URL,
    timeout: 30_000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC REQUEST
// Used for unauthenticated endpoints: login, forgot-password, reset-password.
// No Authorization header is attached.
// ─────────────────────────────────────────────────────────────────────────────

const publicInstance = createInstance();

publicInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error: AxiosError) => Promise.reject(error),
);

publicInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  handleResponseError,
);

// ─────────────────────────────────────────────────────────────────────────────
// PRIVATE REQUEST
// Used for all authenticated endpoints.
// Attaches Bearer token on every request.
// On 401 — clears the session and redirects to /login.
// ─────────────────────────────────────────────────────────────────────────────

const privateInstance = createInstance();

privateInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

privateInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const message = 'Session expired. Please log in again.';
      toast.error(message);
      removeToken();
      globalThis.location.href = '/login';
      return Promise.reject(new Error(message));
    }
    return handleResponseError(error);
  },
);

// ── Typed helper factory ──────────────────────────────────────────────────────
// Wraps an instance so every method unwraps `.data` and is typed at the call site.

function buildApi(instance: AxiosInstance) {
  return {
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
      const r = await instance.get<T>(url, config);
      return r.data;
    },
    async post<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
      const r = await instance.post<T>(url, body, config);
      return r.data;
    },
    async put<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
      const r = await instance.put<T>(url, body, config);
      return r.data;
    },
    async patch<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
      const r = await instance.patch<T>(url, body, config);
      return r.data;
    },
    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
      const r = await instance.delete<T>(url, config);
      return r.data;
    },
  };
}

export const publicRequest  = buildApi(publicInstance);
export const privateRequest = buildApi(privateInstance);
