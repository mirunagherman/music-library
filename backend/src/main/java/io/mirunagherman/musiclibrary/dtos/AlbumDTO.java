package io.mirunagherman.musiclibrary.dtos;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.RepresentationModel;

import java.util.Objects;
import java.util.UUID;

public class AlbumDTO extends RepresentationModel<AlbumDTO> {
    private UUID id;
    private String title;
    private String description;

    public AlbumDTO(){}

    public AlbumDTO(UUID id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AlbumDTO albumDTO = (AlbumDTO) o;
        return Objects.equals(title, albumDTO.getTitle()) &&
                Objects.equals(description, albumDTO.getDescription());
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, description);
    }
}
