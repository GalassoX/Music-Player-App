import axios, { AxiosResponse } from 'axios';
import config from '../utils';

export const searchVideos = async (query: string) => {
    const res = await axios.get(`${config.API_URL}/search`, {
        params: {
            query: query
        }
    });
    return res;
}

export const getAudioURL = async (youtube_id: string): Promise<AxiosResponse<any>> => {
    const res = await axios.get(`${config.API_URL}/getlink`, {
        params: {
            video_id: youtube_id,
        },
        headers: {
            Authorization: window.localStorage.getItem('token') as string
        }
    });
    return res;
}