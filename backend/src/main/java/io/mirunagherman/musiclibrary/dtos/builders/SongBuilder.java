package io.mirunagherman.musiclibrary.dtos.builders;

import io.mirunagherman.musiclibrary.dtos.SongDTO;
import io.mirunagherman.musiclibrary.entities.Song;

public class SongBuilder {
    private SongBuilder(){}

    public static SongDTO toSongDTO(Song song) {
        return new SongDTO(song.getId(), song.getTitle(), song.getLength());
    }

    public static Song toEntity(SongDTO songDTO) {
        Song song = new Song(songDTO.getTitle(), songDTO.getLength());
        song.setId(songDTO.getId());
        return song;
    }
}
