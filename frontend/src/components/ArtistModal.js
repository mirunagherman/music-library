import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

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

const newArtist = {
  name: "",
};

const ArtistModal = (props) => {
    const {
        isOpen,
        onClose,
        onCreateArtist,
        onUpdateArtist,
        artistInput
    } = props;
    const [artist, setArtist] = useState(newArtist);

    useEffect(() => {
        if (!isOpen) {
            setArtist(newArtist);
        }

        if (artistInput) {
            setArtist(artistInput);
        }
    }, [isOpen]);

    const handleOnSubmit = async (event) => {
        event.preventDefault();

        if (artistInput) {
            await onUpdateArtist(artist);
            return
        }

        await onCreateArtist(artist);
    }

    const handleOnChange = (event) => {
        setArtist((prevArtist) => ({
          ...prevArtist,
          [event.target.name]: event.target.value,
        }));
      };

      return (
        <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h5" component="h5">
        {artistInput === undefined ? "Add" : "Update"} Artist
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
            name="name"
            value={artist.name}
            onChange={handleOnChange}
            label="Artist Name"
            variant="filled"
          />

          <Button type="submit">
            {artistInput === undefined ? "Add" : "Update"} Artist
          </Button>
        </form>
      </Box>
    </Modal>
      );
};

export default ArtistModal;