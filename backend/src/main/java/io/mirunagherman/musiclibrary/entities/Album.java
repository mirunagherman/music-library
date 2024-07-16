package io.mirunagherman.musiclibrary.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.io.Serializable;
import java.util.UUID;

import static jakarta.persistence.ConstraintMode.CONSTRAINT;


@Entity
public class Album implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @JdbcTypeCode(SqlTypes.BINARY)
    private UUID id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", length = 1024)
    private String description;

    @JoinColumn(name = "artist_id", nullable = false, foreignKey = @ForeignKey(value = CONSTRAINT, foreignKeyDefinition = "FOREIGN KEY (artist_id) REFERENCES artist(id) ON DELETE CASCADE"))
    @JdbcTypeCode(SqlTypes.BINARY)
    private UUID artistId;

    public Album(){}

    public Album(String title, String description, UUID artistId) {
        this.title = title;
        this.description = description;
        this.artistId = artistId;
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

    public UUID getArtistId() {
        return artistId;
    }

    public void setArtistId(UUID artistId) {
        this.artistId = artistId;
    }
}
