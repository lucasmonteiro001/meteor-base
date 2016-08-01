import { CollectionBase } from '../reuse/collectionBase';

export const CollectionColaboradores = new CollectionBase('Colaboradores');

CollectionColaboradores.setSchema({
  nome: {
    type: String,
    defaultValue: '',
    label: 'Nome',
    formOptions: {
      FIELD_TAG: 'inputH',
      FIELD_TYPE: 'text',
      PLACEHOLDER: 'Nome',
    },
    formValidation: {
      required: { value: true, message: 'O nome é obrigatório' },
    },
    dataTableConfig: {
      link: {
        router: 'ColaboradoresView',
        field: '_id',
      },
    },
  },
  dataNascimento: {
    type: Date,
    optional: true,
    label: 'Data de Nascimento',
    formOptions: {
      FIELD_TAG: 'inputDateH',
      FIELD_TYPE: 'date',
    },
    formValidation: {
      required: { value: true, message: 'A Data de Nascimento é obrigatória' },
    },
  },
  email: {
    type: String,
    defaultValue: '',
    optional: true,
    label: 'Email',
    formOptions: {
      FIELD_TAG: 'inputH',
      FIELD_TYPE: 'text',
      PLACEHOLDER: 'Email',

    },
    formValidation: {
      required: { value: true, message: 'O email é obrigatório' },
      email: { value: true, message: 'O email informado não é válido' },
    },
    dataTableConfig: {
      label: 'Email',
    },
  },
  userId: {
    type: String,
    label: 'Associated User ID',
    autoValue: function () {
      return this.userId;
    },

    dataTableConfig: {
      visible: false,
      orderable: false,
      searchable: false,
    },
  },
  addInfo: {
    type: Object,
    defaultValue: '',
    label: 'Adicionar Informacoes',
    formOptions: {
      FIELD_TAG: 'addInfo',
      CONTROLLER: 'Colaboradores',
      SCHEMANAME: 'teste',
      FIELD_SCHEMA: {
        dia: {
          type: String,
          defaultValue: '',
          label: 'Dia da Semana',
          formOptions: {
            FIELD_TAG: 'inputH',
            FIELD_TYPE: 'text',
          }
        },
        horario: {
          type: String,
          defaultValue: '',
          label: 'Horario',
          formOptions: {
            FIELD_TAG: 'inputH',
            FIELD_TYPE: 'text',
          }
        }
      }
    }
  },
  dia: {
    type: String,
    defaultValue: '',
    label: 'Dia da Semana',
    formOptions: {
      FIELD_TAG: 'inputH',
      FIELD_TYPE: 'text',
      PLACEHOLDER: 'Dia da semana'
    }
  },
  horario: {
    type: String,
    defaultValue: '',
    label: 'Horario',
    formOptions: {
      FIELD_TAG: 'inputH',
      FIELD_TYPE: 'text',
      PLACEHOLDER: 'Horario'
    }
  }
});

CollectionColaboradores.addSubSchema('teste',
    ['dia', 'horario']);

CollectionColaboradores.addSubSchema('insert',
    ['nome', 'dataNascimento', 'email']);

CollectionColaboradores.addSubSchema('update',
    ['nome', 'dataNascimento', 'email']);

CollectionColaboradores.addSubSchema('view',
    ['nome', 'dataNascimento', 'email', 'userId']);

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

