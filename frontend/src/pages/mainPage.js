import {
  getArtists,
  getAlbums,
  getSongs,
  insertAlbum,
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
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";

import AlbumModal from "../components/AlbumModal";

const MainPage = () => {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);

  const getArtistFromList = (id) => {
    for (const a of artists) {
      if (a.id === id) {
        return a.name;
      }
    }
  };

  const getAlbumFromList = (id) => {
    for (const a of albums) {
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

  const onAlbumModalOpen = () => {
    setIsAlbumModalOpen(true);
  };

  const onAlbumModalClose = () => {
    setIsAlbumModalOpen(false);
  };

  const createAlbum = async (album) => {
    const id = await insertAlbum(album);

    if (id) {
      setAlbums((prevAlbums) => [...prevAlbums, { ...album, id: id.data }]);
    }

    onAlbumModalClose();
  };

  useEffect(() => {
    readData();
  }, []);

  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Music Library
            </Typography>
            <Button color="inherit">Add Artist</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <AlbumModal
        isOpen={isAlbumModalOpen}
        onClose={onAlbumModalClose}
        onCreateAlbum={(album) => createAlbum(album)}
        artists={artists}
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
                  {getArtistFromList(getAlbumFromList(row.albumId).artistId)}
                  <Tooltip title="Edit Artist">
                    <IconButton aria-label="edit artist" sx={{ fontSize: 12 }}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Artist">
                    <IconButton
                      aria-label="delete artist"
                      sx={{ fontSize: 12 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Add Album">
                    <IconButton aria-label="add album" sx={{ fontSize: 12 }}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  {getAlbumFromList(row.albumId).title}
                  <Tooltip title="Edit Album">
                    <IconButton aria-label="edit album" sx={{ fontSize: 12 }}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Album">
                    <IconButton aria-label="delete album" sx={{ fontSize: 12 }}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Add Song">
                    <IconButton aria-label="add song" sx={{ fontSize: 12 }}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.length}</TableCell>
                <TableCell>
                  <Tooltip title="Edit Song">
                    <IconButton aria-label="edit song">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title="Delete Song">
                    <IconButton aria-label="delete song">
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
