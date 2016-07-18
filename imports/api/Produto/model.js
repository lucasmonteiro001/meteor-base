import {CollectionProduto} from './collection.js';
import {ModelBase} from '../reuse/modelBase';

class ModelProduto extends ModelBase {

}

export const MdlProduto = new ModelProduto(CollectionProduto);

//Aplicar os métodos que serão utilizados no Client através do "Meteor.Call"
MdlProduto.applyAllMethods();

//Aplicar as publicações que serão consideradas quando no Client for executado
// o "Template.subscribe"
MdlProduto.applyPublications();

//################################################
//############ RESTRIÇÃO POR FUNCIONALIDADE ######
//################################################
//Por default, somente administradores conseguem editar as informações.
//Mais informações: https://atmospherejs.com/ongoworks/security

//Grupos que podem realizar operações no banco de dados
let groups = ['administrador'];
MdlProduto.setGroupPermissions(['insert', 'update', 'remove', 'read'], groups);

//################################################
//############ RESTRIÇÃO POR DADOS ###############
//################################################


