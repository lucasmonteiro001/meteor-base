import { usersCollection } from './collection.js';
import { ModelBase } from '../reuse/modelBase';

class ModelUsers extends ModelBase {
  constructor (collectionBase) {

    super(collectionBase);

    //##################################################
    //###Inicialização de métodos ######################
    //##################################################

    this.functions[collectionBase.getCollection()._name + '.addUser']
        = function (params) {
      check(params, {
        email: String,
        password: String,
        role: String,
      });

      const userId = Accounts.createUser({
        email: params.email,
        password: params.password,
      });

      Roles.addUsersToRoles(userId, params.role);

      return true;
    };

    this.functions[collectionBase.getCollection()._name + '.setRoleOnUser']
        = function (params) {
      check(params, {
        user: String,
        role: String,
      });

      try {
        Roles.setUserRoles(params.user, [params.role]);
      } catch (exception) {
        return exception;
      }
    };

  }
}

export const usersModel = new ModelUsers(usersCollection);

//Aplicar os métodos que serão utilizados no Client através do "Meteor.Call"
usersModel.applyAllMethods();

//Aplicar as publicações que serão consideradas quando no Client for executado
// o "Template.subscribe"
usersModel.applyPublications();

//################################################
//############ RESTRIÇÃO POR FUNCIONALIDADE ######
//################################################
//Por default, somente administradores conseguem editar as informações.
//Mais informações: https://atmospherejs.com/ongoworks/security

//Grupos que podem realizar operações no banco de dados
let groups = ['administrador'];
usersModel.setGroupPermissions(['insert', 'update', 'remove', 'read'], groups);

//################################################
//############ RESTRIÇÃO POR DADos ###############
//################################################

//Aqui deve sevem ser inseridas as regras referentes às restrições por dados.

// Por exemplo: O usuário só pode alterar registros criados por ele ou se ele
// pertencer à regra 'Administrador'.
// Para mais informações sobre o uso do módulo Roles veja:
// http://alanning.github.io/meteor-roles/classes/Roles.html#method_userIsInRole
Security.defineMethod('ownsUsers', {
  fetch: [],
  allow(type, field, userId, doc) {
    if (!field) field = '_id';
    return userId === doc[field] || Roles.userIsInRole(userId, groups);
  },
});
usersModel.setFunctionPermissions(['update', 'read'], 'ownsDocument');

