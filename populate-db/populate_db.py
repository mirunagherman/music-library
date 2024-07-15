import psycopg2
import psycopg2.extras
import uuid
import json


# Change to "relationships" or "tables" accordingly
STAGE: str = "tables"

# CONFIG ##########################################
database: str = 'musiclibrary'
user: str = 'postgres'
password: str = 'Monitor124'
host: str = 'localhost'
port: str = '5432'
###################################################


def populate_simple_data(cursor, records):
    
    artists: list = [e for e in records]
    albums: list = []
    songs: list = []

    # Insert all artists
    for artist in artists:
        cursor.execute("INSERT INTO ARTIST (ID, NAME) VALUES (%s, %s)", (uuid.uuid4().bytes, artist['name']))
        albums.extend(artist['albums'])

    # Insert all albums
    for album in albums:
        cursor.execute("INSERT INTO ALBUM (ID, TITLE, DESCRIPTION) VALUES (%s, %s, %s)", (uuid.uuid4().bytes, album['title'], album['description']))
        songs.extend(album['songs'])

    # Insert all songs
    for song in songs:
        cursor.execute("INSERT INTO SONG (ID, TITLE, LENGTH) VALUES (%s, %s, %s)", (uuid.uuid4().bytes, song['title'], song['length']))  


def populate_relationship_tables():
    pass


if __name__ == '__main__':
    conn = psycopg2.connect(
        database=database,
        user=user,
        password=password,
        host=host,
        port=port
    )
    conn.autocommit = False
    cursor = conn.cursor()
    psycopg2.extras.register_uuid()

    with open('data.json', 'r', encoding='utf-8') as infile:
        records: dict = json.load(infile)

    match STAGE:
        case "tables":
            populate_simple_data(cursor, records)
        case "relationships":
            populate_relationship_tables()
        case _:
            pass

    conn.commit()
    conn.close()
