package io.mirunagherman.musiclibrary.repositories;

import io.mirunagherman.musiclibrary.entities.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;
import java.util.List;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, UUID> {

    @Query(value = "SELECT a FROM Artist a")
    List<Artist> findAllArtists();


}
