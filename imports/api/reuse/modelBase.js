import { Meteor } from 'meteor/meteor';

export class ModelBase {

  /**
   * Construtor
   * @param collectionBase Objeto do tipo CollectionBase.
   */
  constructor (collectionBase) {
    this.myCollection = collectionBase.getCollection();

    this.functions = {};

    this.publications = function (filter, projection) {
      var data = null;
      projection || (projection = {});
      check(projection, Object);

      // se existe um filtro
      if (typeof filter === 'object') {
        check(filter, Object);
        return collectionBase.getCollection().find(filter, { fields: projection });
      } else {
        return this.ready();
      }

    };

    //##################################################
    //###Inicialização de métodos de validaão###########
    //##################################################

    this.functions['user.can.' + collectionBase.getCollection()._name + '.insert'] = function (userId = this.userId) {
      let objDataToCheck = { _id: 'id_Fake_For_Permit_this_action' };
      return Security.can(userId).insert(objDataToCheck).for(collectionBase.getCollection()).check();
    };

    this.functions['user.can.' + collectionBase.getCollection()._name + '.update'] = function (id, userId = this.userId) {
      check(id, String);
      return Security.can(userId).update(id).for(collectionBase.getCollection()).check();
    };

    this.functions['user.can.' + collectionBase.getCollection()._name + '.remove'] = function (id, userId = this.userId) {
      check(id, String);
      return Security.can(userId).remove(id).for(collectionBase.getCollection()).check();

    };

    this.functions['user.can.' + collectionBase.getCollection()._name + '.read'] = function (id, userId = this.userId) {
      check(id, String);
      return Security.can(userId).read(id).for(collectionBase.getCollection()).check();

    };

    //##################################################
    //###Inicialização de métodos que alteram o banco###
    //##################################################

    this.functions[collectionBase.getCollection()._name + '.insert'] = function (dataObj) {

      dataObj.userId = this.userId;
      check(dataObj, collectionBase.getSchema());

      if (!Security.can(this.userId).insert(dataObj).for(collectionBase.getCollection()).check()) {
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
      check(dataObj, collectionBase.getSchemaExceptFields('default', ['userId']));
      if (!Security.can(this.userId).update(id || dataObj).for(collectionBase.getCollection()).check()) {
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
      if (!Security.can(this.userId).remove(id).for(collectionBase.getCollection()).check()) {
        throw new Meteor.Error('Acesso Negado',
            'Você não tem permissão para executar essa ação!');
      } else {

        collectionBase.getCollection().remove(id);
      }
    };

  }

  //##################################################
  //################métodos da classe ModelBase#######
  //##################################################

  /**
   * Inicializa todos os métodos que são executados no servidor, referente ao modelo.
   */
  applyAllMethods () {
    Meteor.methods(this.functions);
  }

  /**
   * Inicializa o método informado
   * @param methodName Nome do método que será inicializado no servidor.
   */
  applyMethod (methodName) {
    Meteor.methods(this.functions[methodName]);
  }

  setMethod (methodName, functionDeclaration) {
    this.functions[methodName] = functionDeclaration;
    this.applyMethod(methodName);
  }

  setPublications (newPublicationsFunction) {
    this.publications = newPublicationsFunction;
    this.applyPublications();
  }

  applyPublications () {
    Meteor.publish(this.myCollection._name, this.publications);
  }

  setGroupPermissions (actionsList, groups) {
    this.myCollection.permit(actionsList).ifHasRole(groups);
  }

  setFunctionPermissions (actionsList, functionName) {
    this.myCollection.permit(actionsList)[functionName]();
  }

}

