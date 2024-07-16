package io.mirunagherman.musiclibrary.repositories;

import io.mirunagherman.musiclibrary.entities.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface AlbumRepository extends JpaRepository<Album, UUID> {

//    @Query(value = "SELECT a FROM Album a")
//    List<Album> findAllAlbums();
}
