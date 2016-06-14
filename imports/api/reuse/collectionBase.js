import { Meteor } from 'meteor/meteor';

export class CollectionBase {

  constructor (collectionName) {
    this.collecitonName = collectionName;
    this.myCollection = new Mongo.Collection(collectionName);

    this.mySchema = { default: new SimpleSchema() };

    //###################################fdsfasd###############
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

  /**
   * Retorna o SimpleSchema desejado
   * @param schemaName Nome do Schema definido
   * @returns {SimpleSchema} Retorna um SimpleSchema
   */
  getSchema (schemaName = 'default') {

    let schema = this.cloneObj(this.mySchema[schemaName]);
    for (let key in schema) {
      if (typeof schema[key].formOptions != 'undefined') {
        delete schema[key].formOptions;
      }

    }
    return new SimpleSchema(schema);
  }

  getSchemaExceptFields (schemaName = 'default', fields) {
    let result = {};
    let schema = this.cloneObj(this.mySchema[schemaName]);
    for (let key in schema) {
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

  getSchemaJson (schemaName = 'default') {
    return this.mySchema[schemaName];
  }  
  
  getCollection () {
    return this.myCollection;
  }

  cloneObj (obj) {
    if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
      return obj;

    if (obj instanceof Date)
      var temp = new obj.constructor(); //or new Date(obj);
    else
      var temp = obj.constructor();

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        obj['isActiveClone'] = null;
        temp[key] = this.cloneObj(obj[key]);
        delete obj['isActiveClone'];
      }
    }

    return temp;
  }


}
