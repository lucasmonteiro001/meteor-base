import { CollectionBase } from '../reuse/collectionBase';
import { schemaProjetos } from './schema';
import { CollectionColaboradores } from '../Colaboradores/collection';

export const CollectionProjetos = new CollectionBase('Projetos');

//Definição do Schema da Collection - Schema Default
CollectionProjetos.setSchema(schemaProjetos);

//################################################
//################ SUB-SCHEMAS ###################
//################################################
CollectionProjetos.addSubSchema('insert',
    ['nome', 'dataInicio', 'cliente', 'colaboradores', 'coordenadores', 'tecnologias', 'esforcoestimado']);

CollectionProjetos.addSubSchema('update',
    ['nome', 'cliente', 'dataInicio', 'dataFim', 'descricao', 'colaboradores', 'coordenadores', 'tecnologias', 'esforcoestimado']);

CollectionProjetos.addSubSchema('tableview',
    ['nome', 'cliente', 'userId', 'tecnologias']);

CollectionProjetos.addSubSchema('view',
    ['nome', 'cliente', 'colaboradores', 'dataInicio', 'tecnologias', 'userId', 'coordenadores', 'esforcoestimado']);

//################################################
//############ RESTRIÇÃO DE ACESSO ###############
//################################################

let permissions = [{
  actions: ['insert'],
  groups: ['administrador'], //Permissions by Functionality
},
  {
    actions: ['update', 'remove'],
    groups: ['administrador'], //Permissions by Functionality
    data: { userId: "{_UserID_}" }, //Filter/Permissions by Data
  }

];

CollectionProjetos.setPermissions(permissions);

//################################################
//#### RELACIONAMENTO ENTRE COLLECTIONS ##########
//################################################

CollectionColaboradores.isRequiredBy(CollectionProjetos);