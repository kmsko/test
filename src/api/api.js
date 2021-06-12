import * as axios from 'axios';

const instance = axios.create({
    baseURL: `http://www.filltext.com/`,
})

export const UsersAPI = {
    getUsers(value) {
        return instance.get(value)
    },
   
}
