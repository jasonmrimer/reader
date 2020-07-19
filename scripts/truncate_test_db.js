conn = new Mongo();
db = conn.getDB('reader');
db.passages.drop();
db.quizzes.drop();
db.submissions.drop();
db.passagemetrics.drop();
