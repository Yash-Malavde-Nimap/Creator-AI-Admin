import { toast as rht } from "react-hot-toast";

const BASE_STYLE = {
  borderRadius: "10px",
  fontSize: "13px",
  fontWeight: "500",
  padding: "10px 16px",
  maxWidth: "360px",
};

const defaultOptions = {
  duration: 3000,
  position: "top-right" as const,
};

const success = (message: string) =>
  rht.success(message, {
    ...defaultOptions,
    style: {
      ...BASE_STYLE,
      background: "#f0fdf4",
      color: "#166534",
      border: "1px solid #bbf7d0",
    },
    iconTheme: { primary: "#22c55e", secondary: "#f0fdf4" },
  });

const error = (message: string) =>
  rht.error(message, {
    ...defaultOptions,
    style: {
      ...BASE_STYLE,
      background: "#fff1f2",
      color: "#9f1239",
      border: "1px solid #fecdd3",
    },
    iconTheme: { primary: "#f43f5e", secondary: "#fff1f2" },
  });

const warning = (message: string) =>
  rht(message, {
    ...defaultOptions,
    icon: "⚠️",
    style: {
      ...BASE_STYLE,
      background: "#fffbeb",
      color: "#92400e",
      border: "1px solid #fde68a",
    },
  });

const info = (message: string) =>
  rht(message, {
    ...defaultOptions,
    icon: "ℹ️",
    style: {
      ...BASE_STYLE,
      background: "#eff6ff",
      color: "#1e40af",
      border: "1px solid #bfdbfe",
    },
  });

const loading = (message: string) =>
  rht.loading(message, {
    position: defaultOptions.position,
    style: {
      ...BASE_STYLE,
      background: "#ffffff",
      color: "#374151",
      border: "1px solid #e5e7eb",
    },
  });

const dismissToast = (id?: string) => rht.dismiss(id);

const promise = <T>(
  promise: Promise<T>,
  messages: { loading: string; success: string; error: string },
) =>
  rht.promise(promise, messages, {
    ...defaultOptions,
    style: BASE_STYLE,
    success: {
      style: {
        ...BASE_STYLE,
        background: "#f0fdf4",
        color: "#166534",
        border: "1px solid #bbf7d0",
      },
    },
    error: {
      style: {
        ...BASE_STYLE,
        background: "#fff1f2",
        color: "#9f1239",
        border: "1px solid #fecdd3",
      },
    },
  });

const toast = {
  success,
  error,
  warning,
  info,
  promise,
  loading,
  dismissToast,
};

export default toast;
