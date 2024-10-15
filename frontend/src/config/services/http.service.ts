import axios from "axios";
import { isEmpty } from "lodash";
import { useAppStore } from "../stores";
import { API_BASE_URL } from "../constants";

const setUpInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const localConfig = config;
      // Do something before request is sent

      //   if (!localConfig.headers["Content-type"])
      //     localConfig.headers["Content-type"] = "application/json";

      //   localConfig.headers.Accept = "application/json";
      localConfig.timeout =
        localConfig.timeout === 0 ? 60000 : localConfig.timeout;
      localConfig.baseURL = API_BASE_URL;

      useAppStore.getState().serverRequest();

      return localConfig;
    },
    (error) => {
      return Promise.reject({
        data: error,
      });
    }
  );
  axios.interceptors.response.use(
    (response) => {
      // const appStore = useAppStore();
      // Any status code that lie within the range of 2xx cause this function to trigger
      const { config, data } = response;

      if (config && config.method !== "get") {
        if (data) {
          useAppStore.getState().setServerSuccess(data);
        }
      }
      // Return entire response if response type blob
      if (config && config.responseType === "blob") return response;
      return data;
    },
    (error) => {
      // const appStore = useAppStore();
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      // eslint-disable-next-line prefer-const
      let { response, code: codeError } = error || {};

      if (!isEmpty(response)) {
        if (response.status === 404) {
          response = {
            data: { server: { message: "Resource not found" } },
          };
        }
      }
      if (codeError === "ECONNABORTED") {
        response = {
          data: {
            server: {
              message: "Request Timeout, Please try again.",
            },
          },
        };
      } else if (codeError === "ERR_NETWORK") {
        response = {
          data: {
            server: {
              message:
                "Connection Failed, Please check your Internet connection and try again.",
            },
          },
        };
      }

      useAppStore.getState().setServerError(response.data);
      return Promise.reject(response);
    }
  );
};

export default setUpInterceptors;
