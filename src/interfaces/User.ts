import IPlaylist from "./Playlist";

export interface IUser {
    _id?: string;
    username: string;
    email?: string;
    password: string;
    token?: string;
    volume?: number;
    playlists?: IPlaylist[];
};