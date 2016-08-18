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

        if (permissions.length>0) {
          let result = true;

          for (let keyPerm in permissions) {

            //Se o usuário não estiver no Grupo ele não pode ver nada
            if (permissions[keyPerm].groups != 'undefined'
                && Roles.userIsInRole(userId, permissions[keyPerm].groups) == false && permissions[keyPerm].actions.indexOf('read')> -1) {
              result = false;

            }
            //Altera o filtro para informar as permissões de acesso
            if (result && permissions[keyPerm].data != 'undefined' && permissions[keyPerm].actions.indexOf('read')> -1) {
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

    this.canUserDo = (action, doc) => {
      let permissions = this.myCollectionBase.getPermissions();
      let userId = Meteor.userId();
      let result = false;
      if (userId === null) {
        //Se não existir userId o retorno é true para permitir que o usuário se cadastre e logue.
        result = true;
      } else {
        if (permissions.length>0) {
          for (let keyPerm in permissions) {
            if (typeof permissions[keyPerm].groups != 'undefined') {

              if (Roles.userIsInRole(userId, permissions[keyPerm].groups)
                  && (permissions[keyPerm].actions.indexOf(action)> -1)) {
                result = true;
              }

            }
            //Verifica somente o acesso, o filtro de dados é feito no Model
            if ((result || typeof permissions[keyPerm].groups == 'undefined')
                && ((typeof permissions[keyPerm].data != 'undefined') && (typeof doc != 'undefined'))) {

              //Não basta ter permissão de functionalidade, tem que ter por dados também caso ela seja definida
              result = false;

              if (typeof doc != 'undefined') {

                //Substitui as tags {_UserID_} pelo ID do usuário no Objeto
                let dataTmp = JSON.stringify(permissions[keyPerm].data);
                permissions[keyPerm].data = JSON.parse(dataTmp.replace(new RegExp('{_UserID_}', 'g'), userId));

                for (let field in permissions[keyPerm].data) {
                  if (permissions[keyPerm].data[field] == doc[field]) {
                    result = true;
                  }

                }

              } else {
                //Caso o subscribe não tenha efetivado não dá acesso à tela.
                result = false;
              }

            }

            if (result) {
              return true;
            }
          }

          //Se nenhuma permissão é atendida o resultado é sempre falso.
          return false;

        } else {
          //Se não existir permissões por funcionalidade (groups) ou data o acesso é sempre permitido.
          return true;
        }
      }

    }

    //Define uma variável para a função de verificação de permissões
    let fCanUserDo = this.canUserDo;

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

      check(dataObj, collectionBase.getSchema('insert'));

      let result = collectionBase.getCollection().insert(dataObj);
        return result;

    };

    this.functions[collectionBase.getCollection()._name + '.update'] = function (id, dataObj) {

      check(id, String);
      console.log(dataObj);
      console.log(collectionBase.getSchema('update'));
      check(dataObj, collectionBase.getSchema('update'));

      let result = collectionBase.getCollection().update(id, {
          $set: dataObj,
        });

      return result;


    };

    this.functions[collectionBase.getCollection()._name + '.remove'] = function (id) {
      check(id, String);

      let result = collectionBase.getCollection().remove(id);
      return result;

    };

    //####################### Hooks ##################################
    //####################### Hooks ##################################
    //####################### Hooks ##################################
    //####################### Hooks ##################################

    this.myCollection.before.remove(function (userId, doc) {

      if (fCanUserDo('remove', doc) == false) {
        throw new Meteor.Error('Acesso negado', 'Você não tem permissão para realizar esta operação.');
        return false;
      } else {
        if (collectionBase.canRemove(doc._id))
          return true;
      }

    });

    this.myCollection.before.update(function (userId, doc) {
      if (fCanUserDo('update', doc) == false) {
        throw new Meteor.Error('Acesso negado', 'Você não tem permissão para realizar esta operação.');
        return false;
      } else
        return true;
    });

    this.myCollection.after.update(function (userId, doc) {
      collectionBase.afterUpdate(doc._id, doc);
    });


    this.myCollection.before.insert(function (userId, doc) {
      if (fCanUserDo('insert') == false) {
        throw new Meteor.Error('Acesso negado', 'Você não tem permissão para realizar esta operação.');
        return false;
      } else {
        return true;
      }

    });

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
