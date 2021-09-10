import firebase from "../Firebase/firebase";

class Service {
  getAll(db) {
    return db;
  }

  create(db,client) {
    return db.push(client);
  }

  update(db,key, value) {
    return db.child(key).update(value);
  }

  delete(db,key) {
    return db.child(key).remove();
  }

  deleteAll(db) {
    return db.remove();
  }
}

export default new Service();
