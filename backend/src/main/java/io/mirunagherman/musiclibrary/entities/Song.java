package io.mirunagherman.musiclibrary.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.io.Serializable;
import java.util.UUID;

import static jakarta.persistence.ConstraintMode.CONSTRAINT;

@Entity
public class Song implements Serializable  {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @JdbcTypeCode(SqlTypes.BINARY)
    private UUID id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "length")
    private String length;

    @JoinColumn(name = "album_id", nullable = false, foreignKey = @ForeignKey(value = CONSTRAINT, foreignKeyDefinition = "FOREIGN KEY (album_id) REFERENCES album(id) ON DELETE CASCADE"))
    @JdbcTypeCode(SqlTypes.BINARY)
    private UUID albumId;

    public Song(){}

    public Song(String title, String length, UUID albumId) {
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
}
