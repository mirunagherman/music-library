package io.mirunagherman.musiclibrary.dtos;

import org.springframework.hateoas.RepresentationModel;

import java.util.Objects;
import java.util.UUID;

public class SongDTO extends RepresentationModel<SongDTO> {
    private UUID id;
    private String title;
    private String length;
    private UUID albumId;

    public SongDTO(){}

    public SongDTO(UUID id, String title, String length, UUID albumId) {
        this.id = id;
        this.title = title;
        this.length = length;
        this.albumId = albumId;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLength() {
        return length;
    }

    public void setLength(String length) {
        this.length = length;
    }

    public UUID getAlbumId() {
        return albumId;
    }

    public void setAlbumId(UUID albumId) {
        this.albumId = albumId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SongDTO songDTO = (SongDTO) o;
        return Objects.equals(title, songDTO.getTitle()) &&
                Objects.equals(length, songDTO.getLength()) &&
                Objects.equals(albumId, songDTO.getAlbumId());
    }

    @Override
    public int hashCode(){
        return Objects.hash(title, length, albumId);
    }
}
