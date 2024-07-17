import { axiosMusicLibrary } from "./axios";

export const getArtists = () => {
  return axiosMusicLibrary.get("/artists");
};

export const insertArtist = (artist) => {
  return axiosMusicLibrary.post("/artists", artist);
};

export const updateArtist = (artist) => {
  return axiosMusicLibrary.put("/artists", artist);
};

export const deleteArtist = (id) => {
  return axiosMusicLibrary.delete(`/artists/${id}`);
};

export const getAlbums = () => {
  return axiosMusicLibrary.get("/albums");
};

export const insertAlbum = (album) => {
  return axiosMusicLibrary.post("/albums", album);
};

export const updateAlbum = (album) => {
  return axiosMusicLibrary.put("/albums", album);
};

export const deleteAlbum = (id) => {
  return axiosMusicLibrary.delete(`/albums/${id}`);
};

export const getSongs = () => {
  return axiosMusicLibrary.get("/songs");
};

export const insertSong = (song) => {
  return axiosMusicLibrary.post("/songs", song);
};

export const updateSong = (song) => {
  return axiosMusicLibrary.put("/songs", song);
};

export const deleteSong = (id) => {
  return axiosMusicLibrary.delete(`/songs/${id}`);
};
