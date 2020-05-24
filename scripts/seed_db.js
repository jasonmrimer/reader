conn = new Mongo();
db = conn.getDB('reader');
db.passages.insert({title: 'For SpaceX, Third Launch is Charm', content: cat('/opt/backend/models/passage01')});