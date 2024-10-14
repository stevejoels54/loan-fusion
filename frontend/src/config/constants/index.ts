/* eslint-disable @typescript-eslint/no-explicit-any */
export const APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const PRIMARY_COLOR = import.meta.env.VITE_PRIMARY_COLOR;

export const searchTable = (data: Record<string, any>[], value: string) => {
  return data?.filter((o) => {
    for (const key in o) {
      if (typeof o[key] === "object") {
        for (const subKey in o[key]) {
          if (
            typeof o[key][subKey] === "string" &&
            String(o[key][subKey]).toLowerCase().includes(value.toLowerCase())
          ) {
            return true;
          }
        }
      } else if (
        typeof o[key] === "string" &&
        String(o[key]).toLowerCase().includes(value.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  });
};

// demo customers
export const customers = [
  {
    customerId: "f7a3d6a0-3b4b-4e4d-8f5d-5a6c9f8b4b2c",
    name: "Joel Steven",
    email: "joelsteven@email.com",
    phone: "256700000000",
    address: "Kampala, Uganda",
  },
  {
    customerId: "f7a3d6a0-3b4b-4e4d-8f5d-5a6c9f8b4b2d",
    name: "John Doe",
    email: "johndoe@email.com",
    phone: "256700000001",
    address: "Kampala, Uganda",
  },
  {
    customerId: "f7a3d6a0-3b4b-4e4d-8f5d-5a6c9f8b4b2e",
    name: "Jane Doe",
    email: "janedoe@email.com",
    phone: "256700000002",
    address: "Kampala, Uganda",
  },
];
