import { CollectionColaboradores } from './collection.js';
import { ModelBase } from '../reuse/modelBase';
import {MdlProjetos} from '../projeto/model';

class ModelColaboradores extends ModelBase {

}

export const MdlColaboradores = new ModelColaboradores(CollectionColaboradores);

MdlColaboradores.setCollectionModelDependent(MdlProjetos);

//Aplicar os métodos que serão utilizados no Client através do "Meteor.Call"
MdlColaboradores.applyAllMethods();

//Aplicar as publicações que serão consideradas quando no Client for executado
// o "Template.subscribe"
MdlColaboradores.applyPublications();

//################################################
//############ RESTRIÇÃO POR FUNCIONALIDADE ######
//################################################
//Por default, somente administradores conseguem editar as informações.
//Mais informações: https://atmospherejs.com/ongoworks/security

//Grupos que podem realizar operações no banco de dados
let groups = ['administrador'];
MdlColaboradores.setGroupPermissions(['insert', 'update', 'remove', 'read'], groups);

//################################################
//############ RESTRIÇÃO POR DADOS ###############
//################################################

//Aqui deve sevem ser inseridas as regras referentes às restrições por dados.

// Por exemplo: O usuário só pode alterar registros criados por ele ou se ele
// pertencer à regra 'Administrador'.
// Para mais informações sobre o uso do módulo Roles veja:
// http://alanning.github.io/meteor-roles/classes/Roles.html#method_userIsInRole
Security.defineMethod('ownsDocument', {
  fetch: [],
  allow(type, field, userId, doc) {
    if (!field) field = 'userId';
    return userId === doc[field] || Roles.userIsInRole(userId, groups);
  },
});
MdlColaboradores.setFunctionPermissions(['update', 'remove', 'read'], 'ownsDocument');

