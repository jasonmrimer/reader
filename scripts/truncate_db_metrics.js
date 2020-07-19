conn = new Mongo();
db = conn.getDB('reader');
db.submissions.drop();
db.passagemetrics.drop();
