import axios from "axios";

type ErrorPayload = {
  message?: string;
};

function hasThaiText(value: string) {
  return /[\u0E00-\u0E7F]/.test(value);
}

export function getErrorMessage(error: unknown, fallbackMessage: string) {
  if (axios.isAxiosError(error)) {
    const responseMessage =
      typeof error.response?.data === "object" && error.response?.data
        ? (error.response.data as ErrorPayload).message
        : undefined;

    return responseMessage || fallbackMessage;
  }

  if (error instanceof Error) {
    if (hasThaiText(error.message)) {
      return error.message;
    }

    return fallbackMessage;
  }

  return fallbackMessage;
}

export function getErrorStatus(error: unknown) {
  if (!axios.isAxiosError(error)) {
    return undefined;
  }

  return error.response?.status;
}
