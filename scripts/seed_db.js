conn = new Mongo();
db = conn.getDB('reader');
filePath = pwd() + '/models/passage01';
db.passages.insert({title: 'For SpaceX, Third Launch is Charm', content: cat(filePath)});