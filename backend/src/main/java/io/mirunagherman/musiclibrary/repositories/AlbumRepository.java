package io.mirunagherman.musiclibrary.repositories;

import io.mirunagherman.musiclibrary.entities.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
public interface AlbumRepository extends JpaRepository<Album, UUID> {

//    @Query(value = "SELECT a FROM Album a")
//    List<Album> findAllAlbums();

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM Album WHERE artistId = :uuid")
    void deleteAlbumByArtistId(@Param("uuid") UUID uuid);

    @Query(value = "SELECT a FROM Album a WHERE a.artistId = :uuid")
    List<Album> findAllByArtistId(@Param("uuid") UUID uuid);
}
