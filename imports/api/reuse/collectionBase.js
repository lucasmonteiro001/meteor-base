/**
 * <p>
 * Finalidade da Classe: Aplicar os métodos para a
 * manipulação de uma collection,
 * baseado nos métodos definidos pelo framework Synergia Meteor.
 * </p>
 *
 * <p>
 * Copyright: Copyright (c) Synergia - DCC - UFMG
 * </p>
 *
 * @author mfpinheiro
 * @author Última modificação realizada por : mfpinheiro $.
 * @version :: 21/06/2016#$.
 *
 */
import { Meteor } from 'meteor/meteor';
import { Utils } from './utils';

export class CollectionBase {

  constructor (collectionName) {
    this.collecitonName = collectionName;
    this.collectionInstance = new Mongo.Collection(collectionName);

    this.schemaDefault = {};
    this.subSchemas = {};

    /**
     * Definições de segurança
     * Deny all client-side updates on the MdlClientes collection
     */
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
   * Retorna o schema desejado
   * @param schemaName - Nome do Schema definido
   * @returns {SimpleSchema} - Retorna o schema passado por parâmetro ou default
   * caso nenhum seja passado por parâmetro
   */
  getSchema (schemaName = 'default') {
    let schema = {};
    if (schemaName === 'default' ||  typeof this.subSchemas[schemaName] == undefined) {
      schema = Utils.cloneObj(this.schemaDefault);
    } else {
      schema = this.getSubSchemaJson(schemaName);
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

  /**
   * Retorna o subSchema desejado
   * @param schemaName - Nome do subSchema definido
   * @returns {*} - Retorna o schema passado por parâmetro ou default
   * caso nenhum seja passado por parâmetro
   */
  getSubSchemaJson (schemaName = 'default') {
    let fields = this.subSchemas[schemaName];
    let schema = Utils.cloneObj(this.schemaDefault);
    for (let key in schema) {
      if (fields.indexOf(key) == -1) {
        delete schema[key];
      }
    }

    return schema;

  }

  /**
   * Aplica um schema
   * @param schema - schema que será aplicado
   */
  setSchema (schema) {
    this.schemaDefault = schema;
    this.collectionInstance.attachSchema(this.getSchema());

  }

  /**
   * Adiciona um subSchmea
   * @param schemaName -
   * @param schemaFields -
   */
  addSubSchema (schemaName, schemaFields) {
    this.subSchemas[schemaName] = schemaFields;
  }

  /**
   * Retorna um subSchema
   * @param schemaName -
   * @returns {*}
   */
  getSubSchema (schemaName) {
    return this.subSchemas[schemaName];
  }

  /**
   *  Retorna o schmema, em formato json, definido no modelo
   * @param schemaName
   * @returns {{}}
   */
  getSchemaJson (schemaName = 'default') {
    let schema = {};

    if (schemaName === 'default' ||  typeof this.subSchemas[schemaName] == undefined) {
      schema = Utils.cloneObj(this.schemaDefault);
    } else {
      schema = this.getSubSchemaJson(schemaName);
    }
    
    return schema;
  }

  /**
   * Retorna a coleção
   * @returns {Mongo.Collection} - Retorna uma coleção
   */
  getCollection () {
    return this.collectionInstance;
  }

}

