import { create } from "zustand";

import { devtools, persist } from "zustand/middleware";

const authStore = (set) => ({
  token: null,
  user: null,
  setToken: (_token, _user) => {
    set(() => ({
      token: _token,
      user: _user,
    }));
  },
  removeToken: () => {
    set(() => ({ token: null, user: null }));
  },
});

const useAuthStore = create(devtools(persist(authStore, { name: "auth" })));

export default useAuthStore;
