import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function Row(props) {
  const { row, aName, songs, onAlbumDelete, onSongDelete, onAlbumEdit, onSongEdit, onAlbumInsert, onSongInsert } = props;
  const [open, setOpen] = useState(false);
  const [artistToEdit, setArtistToEdit] = useState(null);
  const [albumToEdit, setAlbumToEdit] = useState(null);


  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {aName}
        </TableCell>
        <TableCell>{row.title}</TableCell>
        <TableCell>
          <IconButton aria-label="edit album" size="small">
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton aria-label="delete album" size="small">
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {row.description}
              </Typography>
              <Table size="small" aria-label="songs">
                <TableHead>
                  <TableRow>
                    <TableCell component="th">Song Title</TableCell>
                    <TableCell component="th">Duration</TableCell>
                    <TableCell component="th" align="right"></TableCell>
                    <TableCell component="th" align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {songs.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.length}</TableCell>
                      <TableCell>
                        <IconButton aria-label="edit song" size="small">
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton aria-label="delete song" size="small">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default Row;
