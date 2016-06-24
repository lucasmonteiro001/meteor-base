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
}

//Objeto Duplicado
export const CollectionUsers = new CollectionBase();

//Definição dos Schemas
CollectionUsers.setSchema({
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


