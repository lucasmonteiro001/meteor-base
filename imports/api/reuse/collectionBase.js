import { Meteor } from 'meteor/meteor';

export class CollectionBase {

  constructor (collectionName) {
    this.collecitonName = collectionName;
    this.myCollection = new Mongo.Collection(collectionName);

    this.mySchema = { default: new SimpleSchema() };

    //##################################################
    //############# Definições de Segurança ############
    //##################################################
    // Deny all client-side updates on the clienteModel collection
    this.myCollection.deny({
      insert() {
        return true;
      },

      update() {
        return true;
      },

      remove() {
        return true;
      },
    });

  }

  setSchema (schemaName = 'default', schema) {
    this.mySchema[schemaName] = schema;
    if (schemaName === 'default') {
      this.myCollection.attachSchema(new SimpleSchema(schema));
    }

  }

  getSchema (schemaName = 'default') {
    return new SimpleSchema(this.mySchema[schemaName]);
  }

  getSchemaExceptFields (schemaName = 'default', fields) {
    var result = {};
    let schema = this.mySchema[schemaName];
    for (key in schema) {
      if (fields.indexOf(key) == -1) result[key] = schema[key];
    }

    return new SimpleSchema(result);

  }

  getCollection () {
    return this.myCollection;
  }

}
