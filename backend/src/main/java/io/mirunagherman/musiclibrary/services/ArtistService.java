package io.mirunagherman.musiclibrary.services;

import io.mirunagherman.musiclibrary.dtos.ArtistDTO;
import io.mirunagherman.musiclibrary.dtos.builders.ArtistBuilder;
import io.mirunagherman.musiclibrary.entities.Album;
import io.mirunagherman.musiclibrary.entities.Artist;
import io.mirunagherman.musiclibrary.repositories.AlbumRepository;
import io.mirunagherman.musiclibrary.repositories.ArtistRepository;
import io.mirunagherman.musiclibrary.repositories.SongRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ArtistService {
    private static final Logger LOGGER = LoggerFactory.getLogger(ArtistService.class);
    private final ArtistRepository artistRepository;
    private final AlbumRepository albumRepository;
    private final SongRepository songRepository;

    @Autowired
    public ArtistService(ArtistRepository artistRepository, AlbumRepository albumRepository, SongRepository songRepository){
        this.artistRepository = artistRepository;
        this.albumRepository = albumRepository;
        this.songRepository = songRepository;
    }

    public List<ArtistDTO> findAllArtists(){
        List<Artist> artistList = artistRepository.findAllArtists();
        return artistList.stream()
                .map(ArtistBuilder::toArtistDTO)
                .collect(Collectors.toList());
    }

    public UUID insertArtist(ArtistDTO artistDTO){
        Artist artist = ArtistBuilder.toEntity(artistDTO);
        artist = artistRepository.save(artist);
        LOGGER.debug("Artist with id {} and name {} was inserted in the db", artist.getId(), artist.getName());
        return artist.getId();
    }

    public UUID updateArtist(ArtistDTO artistDTO){
        Artist artist = ArtistBuilder.toEntity(artistDTO);
        artist = artistRepository.saveAndFlush(artist);
        LOGGER.debug("Artist with id {} was updated in the db", artist.getId());
        return artist.getId();
    }

    public void deleteArtist(UUID artistId){
        List<Album> albumList = albumRepository.findAllByArtistId(artistId);
        for (Album a: albumList) {
            songRepository.deleteSongByAlbumId(a.getId());
        }
        albumRepository.deleteAlbumByArtistId(artistId);
        artistRepository.deleteById(artistId);
        LOGGER.debug("Artist with id {} was deleted from the db", artistId);
    }
}
