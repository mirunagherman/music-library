import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import { Autocomplete } from "@mui/material";

import { styled, alpha } from "@mui/material/styles";

export const StyleTitle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

export const StyledAppBarButton = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 14,
  marginLeft: 6,
  marginRight: 6,
  border: "2px solid",
  borderRadius: 24,
  transition: "all .2s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#9575cd",
  color: "#311b92",
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#b39ddb",
    color: "#311b92",
    fontSize: 20,
    fontWeight: 500,
  },
  [`&.${tableCellClasses.body}`]: {},
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#ede7f6",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const StyledInputBase = styled(Autocomplete)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiAutocomplete-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "28ch",
      },
    },
  },
}));
