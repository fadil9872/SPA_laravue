import axios from "axios"
import isEmpty from "lodash";
import { setHttpToken } from "../../../helpers";
import { result } from "lodash";

export const register = ({dispatch}, {payload, context}) => {
    return axios
        .post("/api/auth/register", payload)
        .then((result) => {
            console.log(result);
            dispatch("setToken", result.data.meta.token).then(() => {
                dispatch('fetchUser', result.data.data);
            });
        }).catch((err) => {
            context.errors = err.response.data.errors;
        });
}

export const login = ({dispatch}, {payload, context}) => {
    console.log(payload);
    return axios
        .post("/api/auth/login", payload)
        .then((result) => {
            try {
                dispatch("setToken", result.data.meta.token).then(() => {
                    dispatch('fetchUser', {user: result.data.data, token: result.data.meta.token});
                })
            } catch(err) {
                console.trace(err);
            }
        }).catch((err) => {
            context.errors = err.response.data.errors;
        });
}

export const setToken = ({commit, dispatch}, token) => {
    console.log(token)
    if (isEmpty(token)) {
        return dispatch("checkTokenExists")
        .then((token) => {
            setHttpToken(token);
        },(err) => console.trace(err));
    }

    commit("setToken", token);
    setHttpToken(token);
}

export const removeToken = ({commit}) => {
    commit("setAuthenticated", false);
    commit("setUserData", null);
    commit("setToken", null);
    setHttpToken(null);
}

export const fetchUser = ({commit}, payload) => {
    console.log("token", payload);
    axios.get("/api/user",{headers: {"Authorization": "Bearer "+payload.token}})
        .then((result) => {
            console.log(result);
            commit("setAuthenticated", true);
            commit("setUserData", result);
        }).catch((err) => {
            console.log(err.response.data);
        });
}

export const checkTokenExists = () => {
    const token = localStorage.getItem('access_token')
    
    if (isEmpty(token)) {
        return Promise.reject("NO_STORAGE_FOUND");
    }

    return Promise.resolve('token');
}