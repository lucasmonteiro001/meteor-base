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

