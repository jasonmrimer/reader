conn = new Mongo();
db = conn.getDB('reader');
db.passages.drop();
db.quizzes.drop();