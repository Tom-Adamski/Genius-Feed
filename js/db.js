var db = new Dexie("music_database");
          db.version(1).stores({
              artists: 'id,name,image_url'
          });