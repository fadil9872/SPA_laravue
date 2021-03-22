import { isEmpty } from "lodash";

export const setToken = (state, token) => {
    if (isEmpty(token)) {
        localStorage.removeItem('access_token');
        return;
    }
    localStoreage.setToken('access_token', token);
}