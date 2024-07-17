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

const newSong = {
    title: "",
    length: "",
    albumId: "",
};

const SongModal = (props) => {
    const {
        isOpen,
        onClose,
        onCreateSong,
        onUpdateSong,
        songInput,
        albums,
    } = props
    const [song, setSong] = useState(newSong);

    useEffect(() => {
        if (!isOpen) {
            setSong(newSong);
        }

        if (songInput) {
            setSong(songInput)
        }
    }, [isOpen]);

    const getAlbumsOptions = () => {
        if (albums === null || albums ===undefined) {
            return []
        }

        return albums.map((a) => ({
            value: a.id,
            label: a.title 
        }));
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();

        if (songInput) {
            await onUpdateSong(song);
            return;
        }

        await onCreateSong(song);
    };

    const handleOnChange = (event) => {
        setSong((prevSong) => ({
            ...prevSong,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
        <Box sx={style}>
            <Typography variant="h5" component="h5">
            {songInput === undefined ? "Add" : "Update"} Song
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
                value={song.title}
                onChange={handleOnChange}
                label="Song Title"
                variant="filled"
            />
            <TextField
                required
                name="length"
                value={song.length}
                onChange={handleOnChange}
                label="Length"
                variant="filled"
            />
            <TextField
                name="albumId"
                value={song.albumId}
                onChange={handleOnChange}
                select
                label="Album"
                helperText="Please select album"
                variant="filled"
                focused={song.albumId != null}
            >
                {getAlbumsOptions().map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
                ))}
            </TextField>

            <Button type="submit">
                {songInput === undefined ? "Add" : "Update"} Song
            </Button>
            </form>
        </Box>
        </Modal>
    )
};

export default SongModal;