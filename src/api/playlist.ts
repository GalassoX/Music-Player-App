import axios, { AxiosResponse } from "axios";
import IPlaylist, { IPlaylistSong } from '../interfaces/Playlist';
import { IUser } from "../interfaces/User";
import config from "../utils";

export async function createPlaylist({ name }: IPlaylist): Promise<AxiosResponse<IUser>> {
    /*const headers = {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('token')
    }*/
    return await axios({
        method: 'POST',
        url: `${config.API_URL}/newplaylist`,
        data: {
            name: name
        },
        headers: {
            Authorization: window.localStorage.getItem('token') as string
        }
    });
}

export async function deletePlaylist({ _id }: IPlaylist): Promise<AxiosResponse<IUser>> {
    return await axios({
        method: 'DELETE',
        url: `${config.API_URL}/playlist/${_id}`,
        headers: {
            Authorization: window.localStorage.getItem('token') as string
        }
    });
}

export async function updatePlaylist(playlist: IPlaylist) {
    return await axios({
        method: 'PUT',
        url: `${config.API_URL}/playlist/${playlist._id}`,
        data: {
            playlist: playlist
        },
        headers: {
            Authorization: window.localStorage.getItem('token') as string
        }
    });
}

export async function getPlaylist(id: string): Promise<IPlaylist> {
    const res = await axios({
        method: 'GET',
        url: `${config.API_URL}/playlist/${id}`,
        headers: {
            Authorization: window.localStorage.getItem('token') as string
        }
    });
    return res.data;
}

export async function deleteSongPlaylist(playlist: IPlaylist, song: IPlaylistSong): Promise<IPlaylist> {
    const res = await axios({
        method: 'DELETE',
        url: `${config.API_URL}/playlist/${playlist._id}/${song._id}`,
        headers: {
            Authorization: window.localStorage.getItem('token') as string
        }
    });
    const plIndex = res.data.playlists.findIndex((p: IPlaylist) => p._id === playlist._id);
    return res.data.playlists[plIndex];
}