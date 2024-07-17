package io.mirunagherman.musiclibrary.controllers;
import io.mirunagherman.musiclibrary.dtos.AlbumDTO;
import io.mirunagherman.musiclibrary.dtos.ArtistDTO;
import io.mirunagherman.musiclibrary.services.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/albums")
public class AlbumController {
    private final AlbumService albumService;

    @Autowired
    public AlbumController(AlbumService albumService) {this.albumService = albumService;}

    @GetMapping()
    public ResponseEntity<List<AlbumDTO>> getAlbums(){
        List<AlbumDTO> dtos = albumService.findAllAlbums();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<UUID> insertAlbum(@Valid @RequestBody AlbumDTO albumDTO){
        UUID albumId = albumService.insertAlbum(albumDTO);
        return new ResponseEntity<>(albumId, HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<UUID> updateArtist(@Valid @RequestBody AlbumDTO albumDTO){
        UUID albumId = albumService.updateAlbum(albumDTO);
        return new ResponseEntity<>(albumId, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteArtist(@PathVariable("id") UUID albumId){
        albumService.deleteAlbum(albumId);
        return new ResponseEntity<>("Album was deleted", HttpStatus.OK);
    }
}
