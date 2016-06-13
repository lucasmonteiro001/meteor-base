import { collectionCliente } from './collection.js';
import { modelBase } from '../reuse/modelBase';

class modelCliente extends modelBase {

}

export const clienteModel = new modelCliente(collectionCliente);

//Aplicar os métodos que serão utilizados no Client através do "Meteor.Call"
clienteModel.applyAllMethods();

//Aplicar as publicações que serão consideradas quando no Client for executado o "Template.subscribe"
clienteModel.applyPublications();

//################################################
//############ RESTRIÇÃO POR FUNCIONALIDADE ######
//################################################
//Por default, somente administradores conseguem editar as informações.
//Mais informações: https://atmospherejs.com/ongoworks/security

//Grupos que podem realizar operações no banco de dados
let groups = [ 'administrador' ];
clienteModel.setGroupPermissions([ 'insert', 'update', 'remove', 'read' ], groups);

//################################################
//############ RESTRIÇÃO POR DADos ###############
//################################################

//Aqui deve sevem ser inseridas as regras referentes às restrições por dados.

// Por exemplo: O usuário só pode alterar registros criados por ele ou se ele pertencer à regra 'Administrador'.
// Para mais informações sobre o uso do módulo Roles veja: http://alanning.github.io/meteor-roles/classes/Roles.html#method_userIsInRole
Security.defineMethod('ownsDocument', {
  fetch:[],
  allow(type, field, userId, doc) {
    if ( !field ) field = 'userId';
    return userId === doc[ field ] || Roles.userIsInRole(userId, groups);
  }
});
clienteModel.setFunctionPermissions([ 'update', 'remove', 'read' ], 'ownsDocument');

