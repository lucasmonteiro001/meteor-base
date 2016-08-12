import { CollectionBase } from '../reuse/collectionBase';
import { schemaUsers } from './schema';

class CollectionUsers extends CollectionBase {
  constructor () {

    super(null);
    this.collectionName = 'Users';
    this.collectionInstance = Meteor.users;

    this.schemaDefault = new SimpleSchema();
    this.subSchemas = {};

    /**
     * Definições de segurança
     * Deny all client-side updates on the MdlClientes collection
     */
    this.collectionInstance.deny({
      insert() {
        return true;
      },

      update() {
        return true;
      },

      remove() {
        return true;
      },
    });

  }

  /**
   * Define um schema sem aplica-lo à collection Users
   * @param schema - schema que será aplicado
   */
  setSchema (schema) {
    this.schemaDefault = schema;

    //this.collectionInstance.attachSchema(this.getSchema() )

  }

}

//Objeto Duplicado
export const CltUsers = new CollectionUsers();

//Definição do Schema da Collection - Schema Default
CltUsers.setSchema(schemaUsers);

//################################################
//################ SUB-SCHEMAS ###################
//################################################

CltUsers.addSubSchema('update',
    ['profile', 'descricao', 'titulo', 'foto']);


//################################################
//############ RESTRIÇÃO DE ACESSO ###############
//################################################

let permissions = [{
  actions: ['insert'],
  groups: ['administrador'], //Permissions by Functionality
},
  {
    actions: ['update', 'remove', 'read'],
    groups: ['administrador'], //Permissions by Functionality
    data: { userId: "{_UserID_}" }, //Filter/Permissions by Data
  },
  {
    actions: ['update', 'remove', 'read'],
    groups: ['comum'], //Permissions by Functionality
    data: { _id: "{_UserID_}" }, //Filter/Permissions by Data
  }

];

CltUsers.setPermissions(permissions);