import axios from "axios"

export const register = ({dispatch}, {payload}) => {
    return axios
        .post("/api/auth/register", payload)
        .then((resault) => {
            console.log(resault.data);
        }).catch((err) => {
            console.log(err.response.data.errors);
        });
}