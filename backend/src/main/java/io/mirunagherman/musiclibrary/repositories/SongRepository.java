package io.mirunagherman.musiclibrary.repositories;

import io.mirunagherman.musiclibrary.entities.Song;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SongRepository extends JpaRepository<Song, UUID> {
}
