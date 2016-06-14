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

  getSchema (schemaName = 'default') {
    let result = {};
    let schema = this.mySchema[schemaName];
    let key;
    for (key in schema) {

      result[key] = schema[key];
      if (typeof result[key].formOptions != 'undefined') {
        delete result[key].formOptions;
      }

    }

    return new SimpleSchema(result);
  }

  getSchemaExceptFields (schemaName = 'default', fields) {
    let result = {};
    let schema = this.mySchema[schemaName];
    for (key in schema) {
      if (fields.indexOf(key) == -1) {
        result[key] = schema[key];
        if (typeof result[key].formOptions != 'undefined') {
          delete result[key].formOptions;
        }
      }
    }

    return new SimpleSchema(result);

  }

  setSchema (schemaName = 'default', schema) {
    this.mySchema[schemaName] = schema;
    if (schemaName === 'default') {
      this.myCollection.attachSchema(new SimpleSchema(this.getSchema('default')));
    }

  }

  getCollection () {
    return this.myCollection;
  }

}
