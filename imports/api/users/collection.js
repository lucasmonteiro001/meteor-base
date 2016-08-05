import { CollectionBase } from '../reuse/collectionBase';

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

//Definição dos Schemas
CltUsers.setSchema({
  profile: {
    type: String,
    label: 'Nome',
    formOptions: {
      FIELD_COMPONENT: 'input',
      FIELD_TYPE: 'text',
    },
    formValidation: {
      required: { value: true, message: 'O profile é obrigatório' },
    },
    dataTableConfig: {
      label: 'Nome',
      template: 'profileUsersTmp',
    },

  },
  roles: {
    type: Object,
    label: 'Roles',
    dataTableConfig: {
      label: 'Grupo',
      template: 'selectRoles',
    },
  },
  emails: {
    type: Object,
    label: 'Email',
    formOptions: {
      FIELD_COMPONENT: 'input',
      FIELD_TYPE: 'text',
    },
    formValidation: {
      required: { value: true, message: 'O Email é obrigatório' },
    },
    dataTableConfig: {
      label: 'Email',
      template: 'emailUsersTmp',
    },
  },
  //#############################Profile###############
  //#############################Profile###############
  //#############################Profile###############


});

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
  },
  {
    actions: ['update', 'remove'],
    groups: ['comum'], //Permissions by Functionality
    data: { _id: "{_UserID_}" }, //Filter/Permissions by Data
  }

];

CltUsers.setPermissions(permissions);