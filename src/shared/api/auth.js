import axios from "axios";

const instance = axios.create({
    baseURL: "https://wallet.goit.ua"
})

const setToken = token => {
    if(token) {
        return instance.defaults.headers.authorization = `Bearer ${token}`;
    }
    instance.defaults.headers.authorization = "";
}


export const register = async (payload) => {
    const {data: result} = await instance.post("/api/auth/sign-up", payload);
    setToken(result.token);
    return result
}

export const login = async (data)=> {
    const {data: result} = await instance.post("/api/auth/sign-in", data);
    setToken(result.token);
    return result;
}
export const logout = async ()=> {
    const {data} = await instance.post("/api/auth/sign-out");
    setToken();
    return data;
}
export const getCurrent = async (token)=> {
    try {
        setToken(token);
        const {data} = await instance.get("/api/auth/current");
        return data;
    }
    catch(error) {
        setToken();
        throw error;
    }
}

export default instance;