import { axiosMusicLibrary } from "./axios";

export const getArtists = () => {
    return axiosMusicLibrary.get('/artists');
}

export const getAlbums = () => {
    return axiosMusicLibrary.get("/albums")
}

export const insertAlbum = (album) => {
    return axiosMusicLibrary.post('', album)
}

export const getSongs = () => { 
    return axiosMusicLibrary.get("/songs")
}