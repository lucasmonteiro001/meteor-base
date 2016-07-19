import {CollectionColaboradores} from "./collection.js";
import {ModelBase} from "../reuse/modelBase";
import {MdlProjetos} from "../projeto/model";

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


let loggedUser = () => {
    return Meteor.userId();
}
let permissions = {
    byRoles: ['administrador'],
    //And
    byData: {'userId': loggedUser}
}

MdlColaboradores.setFunctionPermissions(['update', 'remove', 'read'], permissions);

