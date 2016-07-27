/**
 * <p>
 * Finalidade da Classe: Aplicar os métodos para a
 * manipulação de uma collection, baseado nos
 * métodos definidos pelo framework Synergia Meteor.
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
import { Random } from 'meteor/random';
import { Utils } from './utils';

export class ModelBase {

  /**
   * Construtor
   * @param collectionBase - Collection que será passada para o construtor
   * @param isTest - Modo de teste
   */
  constructor (collectionBase, isTest = false) {

    this.myCollection = collectionBase.getCollection();

    this.myCollectionBase = collectionBase;

    this.collectionsModelDependents = [];

    this.functions = {};

    this.isTest = isTest;

    this.publications = function (filter, projection, userId) {
      var data = null;
      let permissions = collectionBase.getPermissions();
      projection || (projection = {});
      check(projection, Object);
      check(userId, String);
      // se existe um filtro

      if (typeof filter === 'object') {
        check(filter, Object);

        if (permissions.length > 0) {
          let result = true;

          for (let keyPerm in permissions) {

            //Se o usuário não estiver no Grupo ele não pode ver nada
            if (permissions[keyPerm].groups != 'undefined'
                && Roles.userIsInRole(userId, permissions[keyPerm].groups) == false && permissions[keyPerm].actions.indexOf('read') > -1) {
              result = false;

            }
            //Altera o filtro para informar as permissões de acesso
            if (result && permissions[keyPerm].data != 'undefined' && permissions[keyPerm].actions.indexOf('read') > -1) {
              //Faz a substituiçãop da tag {_UserID_} pelo ID do usuário logado
              let data = JSON.stringify(permissions[keyPerm].data);
              if (typeof userId != 'undefined') {
                data = data.replace(new RegExp('{_UserID_}', 'g'), userId);
              }
              filter = Utils.mergeObj(filter, JSON.parse(data));

            }

          }

          if (result) {
            return collectionBase.getCollection().find(filter, { fields: projection });
          } else {
            //Se em todos os casos o usuário não estiver no grupo ele não pode ver nada
            return this.ready();
          }

        } else {
          //Se não existir permissões é retornado o filtro padrão
          return collectionBase.getCollection().find(filter, { fields: projection });
        }

      } else {
        //Se o parãmetro filter for inválido, ou seja, não for um objeto, não retorna nada.
        return this.ready();
      }

    };

    //######################################################
    //###Inicialização de métodos de validação# de acesso###
    //######################################################

    this.functions['get.' + collectionBase.getCollection()._name + '.permissions']
        = function () {
      return collectionBase.getPermissions();
    };

    //##################################################
    //###Inicialização de métodos que alteram o banco###
    //##################################################

    this.functions[collectionBase.getCollection()._name + '.insert']
        = function (dataObj) {

      /**
       * DESCOMENTE PARA EXECUTAR OS TESTES
       */
      //checkIfisTestMode(dataObj);

      //dataObj.userId = Meteor.userId();

      check(dataObj, collectionBase.getSchema('insert'));

      if ((!Security.can(this.userId).insert(dataObj).for(collectionBase.getCollection()).check())
          && this.isTest === false) {
        throw new Meteor.Error('Acesso Negado',
            'Você não tem permissão para executar essa ação!');
      } else {
        return collectionBase.getCollection().insert(dataObj, (error) => {
          if (error) {
            console.log(error);
          }
        });
      }
    };

    this.functions[collectionBase.getCollection()._name + '.update'] = function (id, dataObj) {

      check(id, String);
      check(dataObj, collectionBase.getSchema('update'));

      if (!Security.can(this.userId).update(id || dataObj)
              .for(collectionBase.getCollection()).check() && this.isTest === false) {
        throw new Meteor.Error('Acesso Negado',
            'Você não tem permissão para executar essa ação!');
      } else {

        collectionBase.getCollection().update(id, {
          $set: dataObj,
        });
      }
    };

    this.functions[collectionBase.getCollection()._name + '.remove'] = function (id) {
      check(id, String);
      if (!Security.can(this.userId).remove(id).for(collectionBase.getCollection()).check()
          && this.isTest === false) {
        throw new Meteor.Error('Acesso Negado',
            'Você não tem permissão para executar essa ação!');
      } else {
        collectionBase.getCollection().remove(id);
      }
    };

    //####################### Hooks ##################################
    //####################### Hooks ##################################
    //####################### Hooks ##################################
    //####################### Hooks ##################################

  }

  /**
   * Inicializa todos os métodos que são executados no servidor, referente ao modelo.
   */
  applyAllMethods () {
    Meteor.methods(this.functions);
    return true;
  }

  /**
   * Retorna todos os métodos em uso
   * @returns {*|any}
   */
  getAllApplyMethods () {
    return Meteor.methods(this.functions);
  }

  setCollectionModelDependent (collectionModel) {
    console.log('Model dependente relacionado ao model Colaborador');
    this.collectionsModelDependents.push(collectionModel);

    this.myCollection.before.remove(function (userId, doc) {
      console.log('Tentativa de remoção');
      console.log(this.collectionsModelDependents);

      for (let key in this.collectionsModelDependents) {
        console.log('Nome:' + this.collectionsModelDependents[key]._name);
      }

    });

  }

  getCollectionName () {
    return this.myCollection._name;
  }

  /**
   * Inicializa o método informado
   * @param methodName Nome do método que será inicializado no servidor.
   */
  applyMethod (methodName) {
    Meteor.methods(this.functions[methodName]);
  }

  /**
   * Aplica os métodos que serão executados no servidor
   * @param methodName
   * @param functionDeclaration
   */
  setMethod (methodName, functionDeclaration) {
    this.functions[methodName] = functionDeclaration;
    this.applyMethod(methodName);
  }

  /**
   * Aplica as publicações para a collection
   * @param newPublicationsFunction
   */
  setPublications (newPublicationsFunction) {
    this.publications = newPublicationsFunction;
    this.applyPublications();
  }

  /**
   * Faz a publicação da collection
   */
  applyPublications () {
    Meteor.publish(this.myCollection._name, this.publications);
  }

  setPermissions (permissions = {}) {

    this.myCollectionBase.setPermissions(permissions);
  }
}
;
