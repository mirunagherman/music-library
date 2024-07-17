package io.mirunagherman.musiclibrary.controllers;

import io.mirunagherman.musiclibrary.dtos.SongDTO;
import io.mirunagherman.musiclibrary.services.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/songs")
public class SongController {
    private final SongService songService;

    @Autowired
    public SongController(SongService songService) {
        this.songService = songService;
    }

    @GetMapping()
    public ResponseEntity<List<SongDTO>> getSongs(){
        List<SongDTO> dtos = songService.findAllSongs();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<UUID> insertSong(@Valid @RequestBody SongDTO songDTO){
        UUID artistId = songService.insertSong(songDTO);
        return new ResponseEntity<>(artistId, HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<UUID> updateArtist(@Valid @RequestBody SongDTO songDTO){
        UUID artistId = songService.updateSong(songDTO);
        return new ResponseEntity<>(artistId, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteArtist(@PathVariable("id") UUID songId){
        songService.deleteSong(songId);
        return new ResponseEntity<>("Song was deleted", HttpStatus.OK);
    }
}
