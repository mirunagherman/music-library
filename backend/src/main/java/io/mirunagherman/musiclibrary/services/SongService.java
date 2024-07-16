package io.mirunagherman.musiclibrary.services;

import io.mirunagherman.musiclibrary.dtos.SongDTO;
import io.mirunagherman.musiclibrary.dtos.builders.SongBuilder;
import io.mirunagherman.musiclibrary.entities.Song;
import io.mirunagherman.musiclibrary.repositories.SongRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SongService {
    private static final Logger LOGGER = LoggerFactory.getLogger(SongService.class);
    private final SongRepository songRepository;

    @Autowired
    public SongService(SongRepository songRepository){
        this.songRepository = songRepository;
    }

    public List<SongDTO> findAllSongs(){
        List<Song> songList = songRepository.findAll();
        return songList.stream()
                .map(SongBuilder::toSongDTO)
                .collect(Collectors.toList());
    }

    public UUID insertSong(SongDTO songDTO){
        Song song = SongBuilder.toEntity(songDTO);
        song = songRepository.save(song);
        LOGGER.debug("Song with id {} and name {} was inserted in the db", song.getId(), song.getTitle());
        return song.getId();
    }

    public UUID updateSong(SongDTO songDTO){
        Song song = SongBuilder.toEntity(songDTO);
        song = songRepository.saveAndFlush(song);
        LOGGER.debug("Song with id {} was updated in the db", song.getId());
        return song.getId();
    }

    public void deleteSong(UUID songId){
        songRepository.deleteById(songId);
        LOGGER.debug("Song with id {} was deleted from the db", songId);
    }
}
