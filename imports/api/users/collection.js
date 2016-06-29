import { CollectionBase } from '../reuse/collectionBase';

class CollectionUsers extends CollectionBase {
  constructor () {

    super(null);
    this.collecitonName = 'Users';
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
    tableView: {
      label: 'Nome',
      template: 'profileUsersTmp',
    },

  },
  roles: {
    type: String,
    label: 'Roles',
    tableView: {
      label: 'Grupo',
      template: 'selectRoles',
    },
  },
  emails: {
    type: String,
    label: 'Email',
    tableView: {
      label: 'Email',
      template: 'emailUsersTmp',
    },
  },
});


