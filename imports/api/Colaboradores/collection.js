import { CollectionBase } from '../reuse/collectionBase';
import { schemaColaboradores } from './schema';


export const CollectionColaboradores = new CollectionBase('Colaboradores');

//Definição do Schema da Collection - Schema Default
CollectionColaboradores.setSchema(schemaColaboradores);

//################################################
//################ SUB-SCHEMAS ###################
//################################################

CollectionColaboradores.addSubSchema('insert',
    ['nome', 'dataNascimento', 'email', 'imageInto', 'addInfo']);

CollectionColaboradores.addSubSchema('update',
    ['nome', 'dataNascimento', 'imageInto', 'email']);

CollectionColaboradores.addSubSchema('view',
    ['nome', 'dataNascimento', 'email', 'userId', 'imageInto']);

CollectionColaboradores.addSubSchema('tableview',
    ['nome', 'email', 'userId']);

//################################################
//############ RESTRIÇÃO DE ACESSO ###############
//################################################

let permissions = [{
  actions: ['insert'],
  groups: ['administrador'], //Permissions by Functionality
},
  {
    actions: ['remove'],
    groups: ['administrador'], //Permissions by Functionality
    data: { userId: "{_UserID_}" }, //Filter/Permissions by Data
  },
  {
    actions: ['update', 'read'],
    groups: ['administrador'], //Permissions by Functionality
    data: { userId: "{_UserID_}" }, //Filter/Permissions by Data
  }

];

CollectionColaboradores.setPermissions(permissions);

