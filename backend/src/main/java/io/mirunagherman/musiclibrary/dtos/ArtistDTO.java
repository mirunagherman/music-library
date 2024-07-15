package io.mirunagherman.musiclibrary.dtos;

import org.springframework.hateoas.RepresentationModel;

import java.util.Objects;
import java.util.UUID;

public class ArtistDTO extends RepresentationModel<ArtistDTO> {
    private UUID id;
    private String name;

    public ArtistDTO(){}

    public ArtistDTO(UUID id, String name){
        this.id = id;
        this.name = name;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ArtistDTO artistDTO = (ArtistDTO) o;
        return Objects.equals(name, artistDTO.name);
    }


    @Override
    public int hashCode(){
        return Objects.hash(name);
    }
}
