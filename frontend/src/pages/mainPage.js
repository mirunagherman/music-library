import {
  getArtists,
  getAlbums,
  getSongs,
  insertAlbum,
  insertSong,
  insertArtist,
  updateArtist,
  updateAlbum,
  updateSong,
  deleteArtist,
  deleteSong,
  deleteAlbum,
} from "../services/musicLibrary";
import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import { CircularProgress } from "@mui/material";

import AlbumModal from "../components/AlbumModal";
import ArtistModal from "../components/ArtistModal";
import SongModal from "../components/SongModal";

const MainPage = () => {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [isArtistModalOpen, setIsArtistModalOpen] = useState(false);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [isSongModalOpen, setIsSongModalOpen] = useState(false);
  const [artistToEdit, setArtistToEdit] = useState(null);
  const [albumToEdit, setAlbumToEdit] = useState(null);
  const [songToEdit, setSongToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getArtistFromList = (id) => {
    for (var a of artists) {
      if (a.id === id) {
        return a;
      }
    }
  };

  const getAlbumFromList = (id) => {
    for (var a of albums) {
      if (a.id === id) {
        return a;
      }
    }
  };

  const readData = async () => {
    const [rArtists, rAlbums, rSongs] = await Promise.all([
      getArtists(),
      getAlbums(),
      getSongs(),
    ]);

    //filter

    if (rArtists) {
      setArtists(rArtists.data);
    }

    if (rAlbums) {
      setAlbums(rAlbums.data);
    }

    if (rSongs) {
      setSongs(rSongs.data);
    }
  };

  const onArtistModalOpen = () => {
    setIsArtistModalOpen(true);
  };

  const onArtistModalClose = () => {
    setIsArtistModalOpen(false);
  };

  const onAlbumModalOpen = () => {
    setIsAlbumModalOpen(true);
  };

  const onAlbumModalClose = () => {
    setIsAlbumModalOpen(false);
  };

  const onSongModalOpen = () => {
    setIsSongModalOpen(true);
  };

  const onSongModalClose = () => {
    setIsSongModalOpen(false);
  };

  const onSelectArtistToEdit = (artist) => {
    setArtistToEdit(artist);
  };

  const onUnselectArtistToEdit = () => {
    setArtistToEdit(null);
  };

  const onSelectAlbumToEdit = (album) => {
    setAlbumToEdit(album);
  };

  const onUnselectAlbumToEdit = () => {
    setAlbumToEdit(null);
  };

  const onSelectSongToEdit = (album) => {
    setSongToEdit(album);
  };

  const onUnselectSongToEdit = () => {
    setSongToEdit(null);
  };

  const createAlbum = async (album) => {
    const id = await insertAlbum(album);

    if (id) {
      setAlbums((prevAlbums) => [...prevAlbums, { ...album, id: id.data }]);
    }

    onAlbumModalClose();
  };

  const editAlbum = async (album) => {
    setIsLoading(true);
    const response = await updateAlbum(album);

    if (response.data) {
      setAlbums((prevAlbums) =>
        prevAlbums.map((a) => {
          if (a.id === response.data) {
            return album;
          }
          return a;
        })
      );

      setIsLoading(false);
      onAlbumModalClose();
  };
}

const removeAlbum = async (album) => {
  setIsLoading(true);
  const id = await deleteAlbum(album.id);

  if (id) {
    setAlbums((prevAlbums) =>
      prevAlbums.filter((a) => album.id !== a.id)
    );
    var newSongs = songs.filter((s) => s.albumId !== album.id);
    setSongs(newSongs);
  }

  setIsLoading(false);
}

  const createArtist = async (artist) => {
    setIsLoading(true);
    const id = await insertArtist(artist);

    if (id) {
      setArtists((prevArtists) => [...prevArtists], { ...artist, id: id.data });
    }

    setIsLoading(false);
    onArtistModalClose();
  };

  const editArtist = async (artist) => {
    setIsLoading(true);
    const response = await updateArtist(artist);

    if (response.data) {
      setArtists((prevArtists) =>
        prevArtists.map((a) => {
          if (a.id === response.data) {
            return artist;
          }
          return a;
        })
      );
    }

    setIsLoading(false);
    onUnselectArtistToEdit();
  };

  const removeArtist = async (artist) => {
    setIsLoading(true);
    const id = await deleteArtist(artist.id);

    if (id) {
      setArtists((prevArtists) =>
        prevArtists.filter((a) => artist.id !== a.id)
      );
      var newAlbums = albums.filter((a) => a.artistId !== artist.id);
      var albumIDs = newAlbums.map((a) => a.id);
      setAlbums(newAlbums);
      var newSongs = songs.filter((s) => albumIDs.includes(s.albumId));
      setSongs(newSongs);
    }

    setIsLoading(false);
  };

  const createSong = async (song) => {
    const id = await insertSong(song);

    if (id) {
      setSongs((prevSongs) => [...prevSongs, { ...song, id: id.data }]);
    }

    onSongModalClose();
  };

  const editSong = async (song) => {
    setIsLoading(true);
    const response = await updateSong(song)

    if (response.data) {
      setSongs((presSongs) =>
        presSongs.map((s) => {
          if (s.id === response.data) {
            return song;
          }
          return s;
        })
      );
    }

    setIsLoading(false);
    onUnselectSongToEdit();
  }

  const removeSong = async (song) => {
    setIsLoading(true);
    const id = await deleteSong(song.id);

    if (id) {
      setSongs((prevSongs) =>
        prevSongs.filter((s) => song.id !== s.id)
      );
    }

    setIsLoading(false);
  };

  useEffect(() => {
    console.log("Render again...");
    readData();
  }, []);

  if (artists === null || songs === null || albums === null || isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Music Library
            </Typography>
            <Button color="inherit" onClick={onArtistModalOpen}>
              Add Artist
            </Button>
            <Button color="inherit" onClick={onAlbumModalOpen}>
              Add Album
            </Button>
            <Button color="inherit" onClick={onSongModalOpen}>
              Add Song
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <ArtistModal
        isOpen={isArtistModalOpen}
        onClose={onArtistModalClose}
        onCreateArtist={(artist) => createArtist(artist)}
      />

      <ArtistModal
        isOpen={artistToEdit != null}
        onClose={onUnselectArtistToEdit}
        onUpdateArtist={(artist) => editArtist(artist)}
        artistInput={artistToEdit}
      />

      <AlbumModal
        isOpen={isAlbumModalOpen}
        onClose={onAlbumModalClose}
        onCreateAlbum={(album) => createAlbum(album)}
        artists={artists}
      />

      <AlbumModal
        isOpen={albumToEdit !== null}
        onClose={onUnselectAlbumToEdit}
        onUpdateAlbum={(album) => editAlbum(album)}
        albumInput={albumToEdit}
        artists={artists}
      />

      <SongModal
        isOpen={isSongModalOpen}
        onClose={onSongModalClose}
        onCreateSong={(song) => createSong(song)}
        albums={albums}
      />

<SongModal
        isOpen={songToEdit !== null}
        onClose={onUnselectSongToEdit}
        onUpdateSong={(song) => editSong(song)}
        songInput={songToEdit}
        albums={albums}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell variant="head">Artist</TableCell>
              <TableCell variant="head">Album</TableCell>
              <TableCell variant="head">Song</TableCell>
              <TableCell variant="head">Duration</TableCell>
              <TableCell variant="head" align="right"></TableCell>
              <TableCell variant="head" align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {
                    getArtistFromList(getAlbumFromList(row.albumId).artistId)
                      .name
                  }
                  <Tooltip title="Edit Artist">
                    <IconButton
                      aria-label="edit artist"
                      sx={{ fontSize: 12 }}
                      onClick={() =>
                        onSelectArtistToEdit(
                          getArtistFromList(
                            getAlbumFromList(row.albumId).artistId
                          )
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Artist">
                    <IconButton
                      aria-label="delete artist"
                      sx={{ fontSize: 12 }}
                      onClick={() =>
                        removeArtist(
                          getArtistFromList(
                            getAlbumFromList(row.albumId).artistId
                          )
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  {getAlbumFromList(row.albumId).title}
                  <Tooltip title="Edit Album">
                    <IconButton 
                    aria-label="edit album" 
                    sx={{ fontSize: 12 }}
                    onClick={() =>
                      onSelectAlbumToEdit(getAlbumFromList(row.albumId))
                    }
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Album">
                    <IconButton aria-label="delete album" sx={{ fontSize: 12 }}
                    onClick={() => removeAlbum(getAlbumFromList(row.albumId))}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.length}</TableCell>
                <TableCell>
                  <Tooltip title="Edit Song">
                    <IconButton aria-label="edit song" sx={{ fontSize: 12 }}
                    onClick={() => onSelectSongToEdit(row)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title="Delete Song">
                    <IconButton 
                    aria-label="delete song"
                    sx={{ fontSize: 12 }}
                      onClick={() =>
                        removeSong(row)}
                      >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MainPage;
