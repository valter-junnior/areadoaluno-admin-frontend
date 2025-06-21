import { store } from "../store"

export const getToken = () => {
  return store.getState().auth.token
}
