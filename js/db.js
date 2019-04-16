var db = new Dexie("music_database");

db.version(1).stores({
    artists: 'id,name,image_url',
});
db.version(2).stores({
    artists: 'id,name,image_url',
    songs: 'id,title, artist_name,image_url,feat_name'
});
db.version(3).stores({
    artists: 'id,name,image_url',
    songs: 'id,title, artist_name, release_date, image_url, feat_name'
});
          
