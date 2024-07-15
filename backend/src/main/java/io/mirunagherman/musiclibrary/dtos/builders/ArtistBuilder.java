package io.mirunagherman.musiclibrary.dtos.builders;

import io.mirunagherman.musiclibrary.dtos.ArtistDTO;
import io.mirunagherman.musiclibrary.entities.Artist;

public class ArtistBuilder {
    private ArtistBuilder(){}

    public static ArtistDTO toArtistDTO(Artist artist){
        return new ArtistDTO(artist.getId(), artist.getName());
    }

    public static Artist toEntity(ArtistDTO artistDTO){
        Artist artist = new Artist(artistDTO.getName());
        artist.setId(artistDTO.getId());
        return artist;
    }
}
