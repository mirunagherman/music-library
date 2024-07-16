package io.mirunagherman.musiclibrary.controllers;

import io.mirunagherman.musiclibrary.dtos.ArtistDTO;
import io.mirunagherman.musiclibrary.services.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/artist")
public class ArtistController {
    private final ArtistService artistService;

    @Autowired
    public ArtistController(ArtistService artistService) {
        this.artistService = artistService;
    }

    @GetMapping()
    public ResponseEntity<List<ArtistDTO>> getArtists(){
        List<ArtistDTO> dtos = artistService.findAllArtists();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<UUID> insertArtist(@Valid @RequestBody ArtistDTO artistDTO){
        UUID artistId = artistService.insertArtist(artistDTO);
        return new ResponseEntity<>(artistId, HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<UUID> updateArtist(@Valid @RequestBody ArtistDTO artistDTO){
        UUID artistId = artistService.updateArtist(artistDTO);
        return new ResponseEntity<>(artistId, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteArtist(@PathVariable("id") UUID artistId){
        artistService.deleteArtist(artistId);
        return new ResponseEntity<>("Artist was deleted", HttpStatus.OK);
    }
}
