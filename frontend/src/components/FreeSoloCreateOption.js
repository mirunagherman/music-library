import React, {useEffect, useState} from "react";
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function FreeSoloCreateOption(props) {
    const {choices, onAddOption} = props;
    const [value, setValue] = useState(null);
  
    return (
        <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={top100Films.map((option) => option.title)}
          renderInput={(params) => <TextField {...params} label="freeSolo" />}
        />
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={top100Films.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search input"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
        />
      </Stack>
    );
  }