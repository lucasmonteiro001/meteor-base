import { CollectionProjetos } from './collection.js';
import { ModelBase } from '../reuse/modelBase';

class ModelProjetos extends ModelBase {

}

export const MdlProjetos = new ModelProjetos(CollectionProjetos);

//Aplicar os métodos que serão utilizados no Client através do "Meteor.Call"
MdlProjetos.applyAllMethods();

//Aplicar as publicações que serão consideradas quando no Client for executado
// o "Template.subscribe"
MdlProjetos.applyPublications();

