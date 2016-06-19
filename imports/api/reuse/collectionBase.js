import { Meteor } from 'meteor/meteor';

export class CollectionBase {

  constructor (collectionName) {
    this.collecitonName = collectionName;
    this.collectionInstance = new Mongo.Collection(collectionName);

    this.schemaDefault = new SimpleSchema();
    this.subSchemas = [];

    //###################################fdsfasd###############
    //############# Definições de Segurança ############
    //##################################################
    // Deny all client-side updates on the clienteModel collection
    this.collectionInstance.deny({
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
    let schema = {};

    if (schemaName === 'default' || this.subSchemas.indexOf(schemaName) == -1) {
      schema = this.cloneObj(this.schemaDefault);
    } else {
      schema = this.getSubSchema(schemaName);
    }

    for (let key in schema) {
      if (typeof schema[key].formOptions != 'undefined') {
        delete schema[key].formOptions;
      }
      if (typeof schema[key].formValidation != 'undefined') {
        delete schema[key].formValidation;
      }
      if (typeof schema[key].tableView != 'undefined') {
        delete schema[key].tableView;
      }

    }
    return new SimpleSchema(schema);
  }

  getSubSchema (schemaName = 'default') {
    let fields = this.subSchemas[schemaName];
    let schema = this.cloneObj(this.schemaDefault);
    for (let key in schema) {
      if (fields.indexOf(key) == -1) {
        if (typeof schema[key].formOptions != 'undefined') {
          delete schema[key].formOptions;
        }
        if (typeof schema[key].formValidation != 'undefined') {
          delete schema[key].formValidation;
        }
        if (typeof schema[key].tableView != 'undefined') {
          delete schema[key].tableView;
        }
      } else {
        delete schema[key]
      }
    }

    return schema;

  }

  setSchema (schema) {
    this.schemaDefault = schema;

  }

  addSubSchema (schemaName, arraySchema) {
    this.subSchemas[schemaName] = arraySchema;
  }

  getSubSchema (schemaName) {
    return this.subSchemas[schemaName];
  }

  getSchemaJson (schemaName = 'default') {
    let schema = {};

    if (schemaName === 'default' || this.subSchemas.indexOf(schemaName) == -1) {
      schema = this.cloneObj(this.schemaDefault);
    } else {
      schema = this.getSubSchema(schemaName);
    }

    return schema;
  }

  getCollection () {
    return this.collectionInstance;
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
