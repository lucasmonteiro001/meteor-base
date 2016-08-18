let profileSchema = {
  //#############################Profile###############
  //#############################Profile###############
  //#############################Profile###############
  nome: {
    type: String,
    defaultValue: '',
    label: 'Nome',
    blackbox: true,
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
  descricao: {
    type: String,
    defaultValue: '',
    blackbox: true,
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
    blackbox: true,
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
    blackbox: true,
    label: 'Minha Foto',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'imageH',
    },
  },
};

export const schemaUsers = {
  profile: {
    type: profileSchema,
    defaultValue: {},
    label: 'Perfil',
    blackbox: true,
    nested: true,
    dataTableConfig: {
      label: 'Perfil',
      template: 'selectPerfil',
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
      VISIBLE: true,
      FIELD_COMPONENT: 'inputH',
      FIELD_TYPE: 'text',
      PLACEHOLDER: 'Email',
    },
    formValidation: {
      required: { value: true, message: 'O Email é obrigatório' },
    },
    dataTableConfig: {
      label: 'Email',
      template: 'emailUsersTmp',
    },
  },

};
