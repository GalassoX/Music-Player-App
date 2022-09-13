import axios, { AxiosResponse } from 'axios';
import { IUser } from '../interfaces/User';
import config from '../utils';

export async function userLogin({ username, password }: IUser): Promise<AxiosResponse<any> | null> {
    /*if (res.status !== 200) {
        return 'El usuario y la contraseña no coinciden';
    } else {
        return res;
    }*/
    try {
        return await axios.post(`${config.API_URL}/login`, {
            username: username,
            password: password,
        });
    } catch (err) {
        return null;
    }
}

export async function userRegister({ username, password, email }: IUser): Promise<AxiosResponse<any>> {
    return await axios.post(`${config.API_URL}/register`, {
        username: username,
        email: email,
        password: password
    });
}

export async function getUser(): Promise<AxiosResponse<IUser>> {
    const res = await axios.get(`${config.API_URL}/user`, {
        headers: {
            Authorization: window.localStorage.getItem('token') as string
        }
    });
    return res;
}

export async function getUserVolume() {
    const res = await axios.get(`${config.API_URL}/user/volume`, {
        headers: {
            Authorization: window.localStorage.getItem('token') as string
        }
    });
    return res.data.volume;
}

export async function setUserVolume(volume: number) {
    await axios({
        method: 'PUT',
        url: `${config.API_URL}/user/volume`,
        data: {
            volume: volume
        },
        headers: {
            Authorization: window.localStorage.getItem('token') as string
        }
    });
}