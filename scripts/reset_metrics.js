conn = new Mongo();
db = conn.getDB('reader');
db.submissions.drop();
db.passagemetrics.drop();
db.passagemetrics.insert(
  {
    interfaceName: 'baseline',
    completionCount: 0
  }
);
db.passagemetrics.insert(
  {
    interfaceName: 'rsvp-basic',
    completionCount: 0
  }
);
db.passagemetrics.insert(
  {
    interfaceName: 'rsvp-progress-bar',
    completionCount: 0
  }
);
db.passagemetrics.insert(
  {
    interfaceName: 'rsvp-section-mark',
    completionCount: 0
  }
);
db.passagemetrics.insert(
  {
    interfaceName: 'rsvp-subway',
    completionCount: 0
  }
);
