import { CollectionProjetos } from './collection.js';
import { ModelBase } from '../reuse/modelBase';
import { MdlColaboradores } from '../colaborador/model';

class ModelProjetos extends ModelBase {

}

export const MdlProjetos = new ModelProjetos(CollectionProjetos);

//Aplicar os métodos que serão utilizados no Client através do "Meteor.Call"
MdlProjetos.applyAllMethods();

MdlProjetos.setCollectionModelDependent(MdlColaboradores);

//Aplicar as publicações que serão consideradas quando no Client for executado
// o "Template.subscribe"
MdlProjetos.applyPublications();

//################################################
//############ RESTRIÇÃO DE ACESSO ###############
//################################################


let permissions = {

  byFunctionality: [{
    actions: ['insert', 'update', 'remove', 'read'],
    groups: ['administrador'],
  }
  ],
  byData: [{
    actions: ['update', 'remove', 'read'],
    groups: ['administrador'],
    data: {userId: "{_UserID_}"},
  }
  ]
}

MdlProjetos.setPermissions(permissions);