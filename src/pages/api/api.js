import axios from "axios";
import Cookies from "universal-cookie";

export class Api {
  client;
  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: this.getHeaders(),
      timeout: 20000,
    });

    this.requestCounter = 0;
    this.maxRequestCounter = 3;
  }

  getHeaders() {
    const cookies = new Cookies();
    const header = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (cookies.get("accessToken")) {
      header.Authorization = `Bearer ${cookies.get("accessToken")}`;
    }
    return header;
  }

  rejecterHandler = function (_, err, showError) {
    if (showError) {
      return {
        description: "Something went wrong. Please try again after sometime.",
        ResponseCode: err?.response?.status || err.code,
      };
    } else if (err && err.response && err.response.data) {
      return err.response.data;
    } else {
      return err;
    }
  };

  getResponse(
    url,
    postbody,
    method,
    showError = true
  ) {
    const api = new Api();
    const apiClient = api.client;
    return new Promise((resolve, reject) => {
      const resolver = function (response) {
        if (response && response.data) {
          resolve(response.data);
        } else {
          reject(response);
        }
      };

      switch (method) {
        case "get":
          return apiClient
            .get(url, postbody)
            .then(resolver)
            .catch((err) => {
              reject(
                this.rejecterHandler(url, err, showError, usingAuthorization)
              );
            });
        case "post":
          return apiClient
            .post(url, postbody)
            .then(resolver)
            .catch((err) => {
              reject(
                this.rejecterHandler(url, err, showError, usingAuthorization)
              );
            });
        case "put":
          return apiClient
            .put(url, postbody)
            .then(resolver)
            .catch((err) => {
              reject(
                this.rejecterHandler(url, err, showError, usingAuthorization)
              );
            });
        case "patch":
          return apiClient
            .patch(url, postbody)
            .then(resolver)
            .catch((err) => {
              reject(
                this.rejecterHandler(url, err, showError, usingAuthorization)
              );
            });
        case "delete":
          return apiClient
            .delete(url, postbody)
            .then(resolver)
            .catch((err) => {
              reject(
                this.rejecterHandler(url, err, showError, usingAuthorization)
              );
            });
      }
    });
  }

  getState() {
    const url = `/api/getState`;
    return this.getResponse(url, {}, "get");
  }

  getCityPostalCode() {
    const url = `/api/getCityPostalCode`;
    return this.getResponse(url, {}, "get");
  }
}