/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-async-promise-executor */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { auth } from "./firebase";

// let baseURL = process.env.REACT_APP_GOOGLE_CLOUD_API_BASE_URL;
const baseURL = "https://5e40-3-16-22-200.ngrok-free.app/api/";

// if (IS_LOCAL_ENV) baseURL = process.env.REACT_APP_DEV_API_BASE_URL;

/**
 * @param description Hits the url given via axios
 * @param returnValue The data returned from the api call, on failure returns error object
 */
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface HttpServiceProps<T = any> {
  url: string;
  method: HttpMethod;
  data?: T;
}

export const httpService = async <T = any, R = any>({
  url,
  method,
  data,
}: HttpServiceProps<T>): Promise<R> => {
  try {
    const idToken = await auth.currentUser?.getIdToken();

    const config: AxiosRequestConfig = {
      baseURL: `${baseURL}${url}`,
      method,
      headers: {
        Authorization: idToken ? `Bearer ${idToken}` : undefined,
      },
      data,
    };

    const response: AxiosResponse<R> = await axios(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`${url} API call failed:`, error.response?.data);
      throw new Error(
        error.response?.data?.message || "An unexpected error occurred"
      );
    }
    throw error;
  }
};
