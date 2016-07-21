import { CltUsers } from './collection.js';
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

export const MdlUsers = new ModelUsers(CltUsers);

//Aplicar os métodos que serão utilizados no Client através do "Meteor.Call"
MdlUsers.applyAllMethods();

//Aplicar as publicações que serão consideradas quando no Client for executado
// o "Template.subscribe"
MdlUsers.applyPublications();


//################################################
//############ RESTRIÇÃO DE ACESSO ###############
//################################################

let permissions = {

  byFunctionality: [{
    actions: ['update', 'read'],
    groups: ['administrador'],
  }]
}

MdlUsers.setPermissions(permissions);