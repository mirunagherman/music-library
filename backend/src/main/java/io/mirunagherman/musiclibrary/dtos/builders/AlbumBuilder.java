package io.mirunagherman.musiclibrary.dtos.builders;

import io.mirunagherman.musiclibrary.dtos.AlbumDTO;
import io.mirunagherman.musiclibrary.entities.Album;

public class AlbumBuilder {
    private AlbumBuilder(){}

    public static AlbumDTO toAlbumDTO(Album album) {
        return new AlbumDTO(album.getId(), album.getTitle(), album.getDescription(), album.getArtistId());
    }

    public static Album toEntity(AlbumDTO albumDTO){
        Album album = new Album(albumDTO.getTitle(), albumDTO.getDescription(), albumDTO.getArtistId());
        album.setId(albumDTO.getId());
        return album;
    }
}
