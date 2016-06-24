import { CollectionContatos } from './collection.js';
import { ModelBase } from '../reuse/modelBase';

class ModelContatos extends ModelBase {

}

export const MdlContatos = new ModelContatos(CollectionContatos);

//Aplicar os métodos que serão utilizados no Client através do "Meteor.Call"
MdlContatos.applyAllMethods();

//Aplicar as publicações que serão consideradas
// quando no Client for executado o "Template.subscribe"
MdlContatos.applyPublications();

//################################################
//############ RESTRIÇÃO POR FUNCIONALIDADE ######
//################################################
//Por default, somente administradores conseguem editar as informações.
//Mais informações: https://atmospherejs.com/ongoworks/security

//Grupos que podem realizar operações no banco de dados
let groups = ['administrador'];
MdlContatos.setGroupPermissions(['insert', 'update', 'remove', 'read'], groups);

//################################################
//############ RESTRIÇÃO POR DADos ###############
//################################################

//Aqui deve sevem ser inseridas as regras referentes às restrições por dados.

// Por exemplo: O usuário só pode alterar registros
// criados por ele ou se ele pertencer à regra 'Administrador'.
// Para mais informações sobre o uso do módulo Roles
// veja: http://alanning.github.io/meteor-roles/classes/Roles.html#method_userIsInRole
Security.defineMethod('youDocument', {
  fetch: [],
  allow(type, field, userId, doc) {
    if (!field) field = 'userId';
    return userId === doc[field] || Roles.userIsInRole(userId, groups);
  },
});
MdlContatos.setFunctionPermissions(['update', 'remove', 'read'], 'youDocument');

