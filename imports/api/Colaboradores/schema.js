export const schemaColaboradores = {
  nome: {
    type: String,
    defaultValue: '',
    label: 'Nome',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'inputH',
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
      VISIBLE: true,
      FIELD_COMPONENT: 'inputDateH',
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
      VISIBLE: true,
      FIELD_COMPONENT: 'inputH',
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
  imageInto: {
    type: String,
    defaultValue: '',
    label: 'Minha Foto',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'imageH',
    },
  },
  addInfo: {
    type: [Object],
    defaultValue: [],
    blackbox: true,
    label: 'adicionar Informacoes',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'fieldObjectManagementH',
      FIELD_SCHEMA: {
        dia: {
          type: String,
          defaultValue: '',
          label: 'Dia da Semana',
          formOptions: {
            VISIBLE: true,
            FIELD_COMPONENT: 'inputH',
            FIELD_TYPE: 'text',
            PLACEHOLDER: 'dia da semana'
          },
        },
        horario: {
          type: String,
          defaultValue: '',
          label: 'Horario',
          formOptions: {
            VISIBLE: true,
            FIELD_COMPONENT: 'inputH',
            FIELD_TYPE: 'text',
            PLACEHOLDER: 'horario'
          },
        },
      },
    }
  },
};
