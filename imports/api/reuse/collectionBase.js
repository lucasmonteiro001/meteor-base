import { Meteor } from 'meteor/meteor';

export class collectionBase {

  constructor (collectionName) {
    this.collecitonName = collectionName;
    this.myCollection = new Mongo.Collection(collectionName);
    this.mySchema = new SimpleSchema();

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

  setSchema (mySchema) {
    this.mySchema = new SimpleSchema(mySchema);
    this.myCollection.attachSchema(this.mySchema);
  }

  getSchema () {
    return this.mySchema;
  }

  getCollection () {
    return this.myCollection;
  }

}
