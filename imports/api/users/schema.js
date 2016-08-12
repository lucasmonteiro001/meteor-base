export const schemaUsers = {
  profile: {
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
      title: 'Novo_Nome',
      link: {
        router: 'profile',
        field: '_id',
      },
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
  descricao: {
    type: String,
    defaultValue: '',
    optional: true,
    label: 'Descrição:',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'textareaH',
      ROWS: 3,
    },
    formValidation: {},
  },
  titulo: {
    type: String,
    defaultValue: '',
    label: 'Título',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'inputH',
      FIELD_TYPE: 'text',
      PLACEHOLDER: 'Títulos',
    },
    formValidation: {},
    dataTableConfig: {
      title: 'Título',
    },
  },
  foto: {
    type: String,
    defaultValue: '',
    label: 'Minha Foto',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'imageH',
    },
  },
};
