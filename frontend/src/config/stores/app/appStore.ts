import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";

const initialState = {
  serverSuccess: {},
  serverError: {},

  sideBarCollapsed: false,
  drawerOpen: false,

  activeApplication: "loans",
};

const store = (set: (fn: (state: typeof initialState) => void) => void) => ({
  ...initialState,
  // actions
  serverRequest: () => {
    set(
      produce((state) => {
        state.serverSuccess = {};
        state.serverError = {};
      })
    );
  },
  setServerSuccess: (data: unknown) => {
    set(
      produce((state) => {
        state.serverSuccess = data;
        state.serverError = {};
      })
    );
  },
  setServerError: (error: unknown) => {
    set(
      produce((state) => {
        state.serverSuccess = {};
        state.serverError = error;
      })
    );
  },
  setSideBarCollapsed: (collapsed: boolean) => {
    set(
      produce((state) => {
        state.sideBarCollapsed = collapsed;
      })
    );
  },
  setDrawerOpen: (open: unknown) => {
    set(
      produce((state) => {
        state.drawerOpen = open;
      })
    );
  },
  setActiveApplication: (app: string) => {
    set(
      produce((state) => {
        state.activeApplication = app;
      })
    );
  },
});

const storeName = "APP STORE";
const useAppStore = create(
  devtools(persist(store, { name: storeName }), { name: storeName })
);

export default useAppStore;
