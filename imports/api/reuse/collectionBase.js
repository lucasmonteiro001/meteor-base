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
    this.collectionName = collectionName;
    this.collectionInstance = new Mongo.Collection(collectionName);
    this.collectionPermissions = {};
    this.collectionsDependents = [];

    if (Meteor.isCordova) {
      Ground.Collection(this.collectionInstance);
    }

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

    //region todo####################### Hooks #######################
    const listOfCollectionsDependents = this.collectionsDependents;
    const thisCollectionName = this.collectionName;

    this.collectionInstance.after.update(function (userId, doc) {

      //Itera
      for (let key in listOfCollectionsDependents) {
        let Schema = listOfCollectionsDependents[key].getSchemaJson();

        //Itera os campos da collection dependente está associado à collection em alteração
        //Para realizar a atualização
        for (let field in Schema) {
          if (typeof Schema[field].formOptions != 'undefined'
              && typeof Schema[field].formOptions.OPTIONSCOLLECTION != 'undefined'
              && Schema[field].formOptions.OPTIONSCOLLECTION.COLLECTION == thisCollectionName) {

            //Define o filtro que será utilizado para
            // realizar a atualização
            let fieldFilter = JSON.parse('{"' + field + '._id": "' + this.previous._id + '"}');

            //Define a String de atualização considerando o
            // campo que será atualizado como um array de objetos
            let atualizar = JSON.parse('{"$set": {"' + field + '.$": ' + JSON.stringify(doc) + '}}');

            //Executa a atualização do campo
            let cursor = listOfCollectionsDependents[key].collectionInstance.update(fieldFilter, atualizar, {
              upsert: false,
              multi: true,
            });
          }
        }

      }
    });
    //endregion
  }

  /**
   * Retorna o schema desejado
   * @param schemaName - Nome do Schema definido
   * @returns {SimpleSchema} - Retorna o schema passado por parâmetro ou default
   * caso nenhum seja passado por parâmetro
   */
  getSchema (schemaName = 'default') {
    let schema = {};
    if (schemaName === 'default' || typeof this.subSchemas[schemaName] == undefined) {
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

      if (typeof schema[key].dataTableConfig != 'undefined') {
        delete schema[key].dataTableConfig;
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
    let fields = [];
    if (typeof this.subSchemas[schemaName] != 'undefined')
      fields = this.subSchemas[schemaName];
    else
      console.log('O SubSchema ' + schemaName + ' NÃO existe!!!');
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
   * Inclui em uma lista uma collection que depende da atual
   * @param collection - é a collection dependente
   */
  isRequiredBy (collection) {
    console.log(collection.collectionName + ' depende da collection ' + this.collectionName);
    this.collectionsDependents.push(collection);

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

    if (schemaName === 'default' || typeof this.subSchemas[schemaName] == undefined) {
      schema = Utils.cloneObj(this.schemaDefault);
    } else {
      schema = this.getSubSchemaJson(schemaName);
    }

    return schema;
  }

  /**
   *  Retorna o schema, em formato json para um determinado campo do documento
   * @param schemaName
   * @returns {{}}
   */
  getFieldSchemaJson (fieldName) {
    let schema = {};
    let fieldJson = {};

    schema = Utils.cloneObj(this.schemaDefault);

    if (schema[fieldName] && schema[fieldName].formOptions && schema[fieldName].formOptions.FIELD_SCHEMA) {
      fieldJson = schema[fieldName].formOptions.FIELD_SCHEMA;
    }

    return fieldJson;
  }

  /**
   * Retorna a coleção
   * @returns {Mongo.Collection} - Retorna uma coleção
   */
  getCollection () {
    return this.collectionInstance;
  }

  /**
   * Retorna um objeto com as permissões da Collection
   */
  getPermissions () {
    return this.collectionPermissions;
  }

  /**
   * Aplica as permissões para ações por funcionalidade e por data
   * Essa funcionalidade só pode ser aplicada no servidor
   * @param permissions permissões definidas para a collection
   */
  setPermissions (permissions) {
    if (Meteor.isServer) {

      this.collectionPermissions = permissions;

      if (typeof permissions.byFunctionality != 'undefined') {
        for (let keyPerm in permissions.byFunctionality) {
          this.collectionInstance.permit(permissions.byFunctionality[keyPerm].actions).ifHasRole(permissions.byFunctionality[keyPerm].groups);
        }
      }

      if (typeof permissions.byData != 'undefined') {
        for (let keyPerm in permissions.byData) {

          Security.defineMethod(this.collectionName + 'Permissions_' + keyPerm, {
            fetch: [],
            allow(type, field, userId, doc) {
              let result = true;

              for (let key in permissions.byData[keyPerm].data) {
                if (doc[key] != permissions.byData[keyPerm].data[key])
                  result = false;
              }

              return result && Roles.userIsInRole(userId, permissions.byData[keyPerm].groups);
            },
          });
          this.collectionInstance.permit(permissions.byData[keyPerm].actions)[this.collectionName + 'Permissions_' + keyPerm]();
        }

      }

    }

  }

}
;
