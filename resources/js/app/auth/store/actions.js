import axios from "axios"

export const register = ({dispatch}, {payload, context}) => {
    return axios
        .post("/api/auth/register", payload)
        .then((resault) => {
            console.log(resault.data);
        }).catch((err) => {
            context.errors = err.response.data.errors;
        });
}