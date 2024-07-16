import psycopg2
import psycopg2.extras
import uuid
import json


# CONFIG ##########################################
database: str = 'musiclibrary'
user: str = 'postgres'
password: str = 'Monitor124'
host: str = 'localhost'
port: str = '5432'
###################################################    


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

    artists: list = [e for e in records]

    # Insert all artists
    for artist in artists:
        id_artist: bytes = uuid.uuid4().bytes
        cursor.execute("INSERT INTO ARTIST (ID, NAME) VALUES (%s, %s)", (id_artist , artist['name']))
        for album in artist['albums']:
            id_album: bytes = uuid.uuid4().bytes
            cursor.execute("INSERT INTO ALBUM (ID, TITLE, DESCRIPTION, ARTIST_ID) VALUES (%s, %s, %s, %s)", 
                           (id_album, album['title'], album['description'], id_artist))
            for song in album['songs']:
                cursor.execute("INSERT INTO SONG (ID, TITLE, LENGTH, ALBUM_ID) VALUES (%s, %s, %s, %s)", 
                               (uuid.uuid4().bytes, song['title'], song['length'], id_album))

    conn.commit()
    conn.close()
