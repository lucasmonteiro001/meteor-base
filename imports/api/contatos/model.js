import {collectionContato} from './collection.js';
import {ModelBase} from '../reuse/modelBase';

class ModelContato extends ModelBase {

}

export const contatoModel = new ModelContato(collectionContato);

//Aplicar os métodos que serão utilizados no Client através do "Meteor.Call"
contatoModel.applyAllMethods();

//Aplicar as publicações que serão consideradas quando no Client for executado o "Template.subscribe"
contatoModel.applyPublications();

//################################################
//############ RESTRIÇÃO POR FUNCIONALIDADE ######
//################################################
//Por default, somente administradores conseguem editar as informações.
//Mais informações: https://atmospherejs.com/ongoworks/security

//Grupos que podem realizar operações no banco de dados
let groups = ['administrador'];
contatoModel.setGroupPermissions(['insert', 'update', 'remove', 'read'], groups);

//################################################
//############ RESTRIÇÃO POR DADos ###############
//################################################

//Aqui deve sevem ser inseridas as regras referentes às restrições por dados.

// Por exemplo: O usuário só pode alterar registros criados por ele ou se ele pertencer à regra 'Administrador'.
// Para mais informações sobre o uso do módulo Roles veja: http://alanning.github.io/meteor-roles/classes/Roles.html#method_userIsInRole
Security.defineMethod('youDocument', {
    fetch: [],
    allow(type, field, userId, doc) {
        if (!field) field = 'userId';
        return userId === doc[field] || Roles.userIsInRole(userId, groups);
    }
});
contatoModel.setFunctionPermissions(['update', 'remove', 'read'], 'youDocument');

