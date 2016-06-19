import { Mongo } from 'meteor/mongo';

export class ControllerBase {

  constructor (collectionBase) {
    this.collectionInstance = collectionBase.getCollection();
    this.collectionInstanceBase = collectionBase;
    this.filter = {};
  }

  setFilter (filter) {
    this.filter = filter;
  }

  getProjection (schemaName) {
    let fields = getSubSchema(schemaName);
    let projection = { _id: 1 };
    fields.forEach(function (field) {
      projection[field] = 1;
    });

    return projection;

  }

  getAll () {
    const resultado = this.collectionInstance.find();
    if (resultado)
      return resultado;
  }

  getCollection () {
    return this.collectionInstance;

  }

  getCollectionName () {
    return this.collectionInstance._name;
  }

  getSchema (schemaName = 'default') {
    return this.collectionInstanceBase.getSchema(schemaName);
  }

  getSchemaJson (schemaName = 'default') {
    return this.collectionInstanceBase.getSchemaJson(schemaName);
  }

  get (id) {
    return this.collectionInstance.findOne(id);
  }

  applySubscribe (controller, schemaName, template, id = '', callback) {
    let filterTmp = this.filter;
    if (id != '') {
      filterTmp._id = id;
    } else {
      delete filterTmp._id;
    }

    let handle = template.subscribe(this.getCollectionName(), filterTmp, this.getProjection(schemaName));

    template.autorun(() => {
      const isReady = handle.ready();
      if (isReady) {
        callback();
      }
    });

  }

  insert (collectionData, callback) {
    Meteor.call(this.getCollectionName() + '.insert', collectionData, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  }

  update (id, collectionData, callback) {
    Meteor.call(this.getCollectionName() + '.update', id, collectionData, (error) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, 'ok');
      }
    });
  }

  remove (id, callback) {

    Meteor.call(this.getCollectionName() + '.remove', id, (error) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, 'ok');
      }
    });
  }

  checkIfCanUserRemove (reactVar, id) {
    let idToCheck = id;
    if (typeof id === 'undefined' || id === null) {
      idToCheck = 'id_Fake_For_Permit_this_action';
    } else {
      idToCheck = id;
    }

    Meteor.call('user.can.' + this.getCollectionName() + '.remove', idToCheck, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        reactVar.set(result);
      }
    });
  }

  checkIfCanUserInsert (reactVar) {
    Meteor.call('user.can.' + this.getCollectionName() + '.insert', (error, result) => {
      if (error) {
        console.log(error);
      } else {
        reactVar.set(result);
      }
    });
  }

  checkIfCanUserUpdate (reactVar, id) {
    let idToCheck = id;
    if (typeof id === 'undefined' || id === null) {
      idToCheck = 'id_Fake_For_Permit_this_action';
    } else {
      idToCheck = id;
    }

    Meteor.call('user.can.' + this.getCollectionName() + '.update', idToCheck, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        reactVar.set(result);
      }
    });
  }

  checkIfCanUserView (reactVar, id) {
    let idToCheck = id;
    if (typeof id === 'undefined' || id === null) {
      idToCheck = 'id_Fake_For_Permit_this_action';
    } else {
      idToCheck = id;
    }

    Meteor.call('user.can.' + this.getCollectionName() + '.read', idToCheck, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        reactVar.set(result);
      }
    });
  }
}
;

