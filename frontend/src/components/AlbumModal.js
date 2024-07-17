import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const newAlbum = {
  title: "",
  description: "",
  artistId: "",
};

const AlbumModal = (props) => {
  const {
    isOpen,
    onClose,
    onCreateAlbum,
    onUpdateAlbum,
    albumInput,
    artists,
  } = props;
  const [album, setAlbum] = useState(newAlbum);

  useEffect(() => {
    if (!isOpen) {
      setAlbum(newAlbum);
    }

    if (albumInput) {
      setAlbum(albumInput);
    }
  }, [isOpen]);

  const getArtistsOptions = () => {
    if (artists == null || artists == undefined) {
        return [];
    } 

    return artists.map((a) => ({
        value: a.id,
        label: a.name
    }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (albumInput) {
      await onUpdateAlbum(album);
      return;
    }

    await onCreateAlbum(album);
  };

  const handleOnChange = (event) => {
    setAlbum((prevAlbum) => ({
      ...prevAlbum,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h5" component="h5">
          Add Album
        </Typography>
        <form
          onSubmit={handleOnSubmit}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 15,
          }}
        >
          <TextField
            required
            name="title"
            value={album.title}
            onChange={handleOnChange}
            label="Album Title"
            variant="filled"
          />
          <TextField
            required
            name="description"
            value={album.description}
            onChange={handleOnChange}
            label="Description"
            variant="filled"
          />
          <TextField
            name="artistId"
            value={album.artistId}
            onChange={handleOnChange}
            select
            label="Artist"
            helperText="Please select artist"
            variant="filled"
            focused={album.artistId != null}
          >
            {getArtistsOptions().map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Button type="submit">
            {albumInput === undefined ? "Add" : "Update"} Album
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AlbumModal;
