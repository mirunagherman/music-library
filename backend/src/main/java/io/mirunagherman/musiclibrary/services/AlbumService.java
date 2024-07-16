package io.mirunagherman.musiclibrary.services;

import io.mirunagherman.musiclibrary.dtos.AlbumDTO;
import io.mirunagherman.musiclibrary.dtos.builders.AlbumBuilder;
import io.mirunagherman.musiclibrary.entities.Album;
import io.mirunagherman.musiclibrary.repositories.AlbumRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AlbumService {
    private static final Logger LOGGER = LoggerFactory.getLogger(AlbumService.class);
    private final AlbumRepository albumRepository;

    @Autowired
    public AlbumService(AlbumRepository albumRepository) {this.albumRepository = albumRepository;}

    public List<AlbumDTO> findAllAlbums(){
        List<Album> albumList = albumRepository.findAll();
        return albumList.stream()
                .map(AlbumBuilder::toAlbumDTO)
                .collect(Collectors.toList());
    }

    public UUID insertAlbum(AlbumDTO albumDTO){
        Album album = AlbumBuilder.toEntity(albumDTO);
        album = albumRepository.save(album);
        LOGGER.debug("Artist with id {} and name {} was inserted in the db", album.getId(), album.getTitle());
        return album.getId();
    }

    public UUID updateAlbum(AlbumDTO albumDTO){
        Album album = AlbumBuilder.toEntity(albumDTO);
        album = albumRepository.saveAndFlush(album);
        LOGGER.debug("Album with id {} was updated in the db", album.getId());
        return album.getId();
    }

    public void deleteAlbum(UUID albumId){
        albumRepository.deleteById(albumId);
        LOGGER.debug("Album with id {} was deleted from the db", albumId);

    }
}
