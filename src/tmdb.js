import axios from "axios";

export default axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers:{
        Accept: "application/json"
    },
    params:{
        api_key: '835cc50e0595c2ad056788e5105335d9',
    }
})