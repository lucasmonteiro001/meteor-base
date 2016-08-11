import { CollectionBase } from '../reuse/collectionBase';
import { CollectionColaboradores } from '../Colaboradores/collection';

export const CollectionProjetos = new CollectionBase('Projetos');

CollectionColaboradores.isRequiredBy(CollectionProjetos);

//Definição dos Schemas
CollectionProjetos.setSchema({
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
      title: 'Novo_Nome',
      link: {
        router: 'ProjetosView',
        field: '_id',
      },
    },
  },
  cliente: {
    type: [Object],
    blackbox: true,
    defaultValue: [],
    label: 'Cliente',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'fieldObjectManagementH',
      FIELD_SCHEMA: {
        nomecliente: {
          type: String,
          defaultValue: '',
          label: 'Nome',
          formOptions: {
            VISIBLE: true,
            FIELD_COMPONENT: 'inputH',
            FIELD_TYPE: 'text',
          },
          formValidation: {
            required: { value: true, message: 'O nome do cliente é obrigatório' },
          },
        },
        emailcliente: {
          type: String,
          defaultValue: '',
          label: 'Email',
          formOptions: {
            VISIBLE: true,
            FIELD_COMPONENT: 'inputH',
            FIELD_TYPE: 'email',
          },
          formValidation: {
            required: { value: true, message: 'O email do cliente é obrigatório' },
            email: { value: true, message: 'O email informado não é válido' },
          },
        },
        datanascimentocliente: {
          type: Date,
          optional: true,
          label: 'Data de Nascimento',
          formOptions: {
            VISIBLE: true,
            FIELD_COMPONENT: 'inputDateH',
            FIELD_TYPE: 'date',
          },
          formValidation: {
            required: { value: true, message: 'A data de nascimento do cliente é obrigatória' },
            date: { value: true, message: 'A data informada é inválida' },
          },
        },
      },
    },
    formValidation: {
      required: { value: true, message: 'Campo obrigatório' },
    },
    dataTableConfig: {
      orderable: false,
      RenderObjects: 'OnTable',
    },
  },
  tecnologias: {
    type: [String],
    blackbox: true,
    defaultValue: [],
    optional: true,
    label: 'Tecnologias',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'inputTaggingH',
      FIELD_TYPE: 'text',
    },
    dataTableConfig: {
      orderable: false,
      RenderObjects: 'inList',
    },
  },
  esforcoestimado: {
    type: Number,
    defaultValue: 0,
    optional: true,
    label: 'Esforço Estimado',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'inputH',
      FIELD_TYPE: 'number',
    },
    dataTableConfig: {
      label: 'Esforço Estimado',
    },
  },
  dataInicio: {
    type: Date,
    optional: true,
    label: 'Data de Início',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'inputDateH',
      FIELD_TYPE: 'date',
    },
    formValidation: {
      required: { value: true, message: 'A data de início é obrigatória' },
    },
  },
  dataFim: {
    type: Date,
    optional: true,
    label: 'Data de Fim',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'inputDateH',
      FIELD_TYPE: 'date',
    },
    formValidation: {
      //date: {value:true, message: 'O valor informado não é uma data válida'}
    },
  },
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
  coordenadores: {
    type: [Object],
    blackbox: true,
    defaultValue: [],
    optional: true,
    label: 'Coordenadores',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'multipleHCollection',
      OPTIONSCOLLECTION: {
        COLLECTION: 'Colaboradores',
        COLLECTION_SCHEMA: 'tableview',
        FIRST_FIELD: 'nome',
      },
    },
    formValidation: {
      required: { value: true, message: 'Campo obrigatório' },
    },
    dataTableConfig: {
      orderable: false,
      RenderObjects: 'OnTable',
    },
  },
  colaboradores: {
    type: [Object],
    blackbox: true,
    defaultValue: [],
    optional: true,
    label: 'Colaboradores',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'multipleHCollection',
      OPTIONSCOLLECTION: {
        COLLECTION: 'Colaboradores',
        COLLECTION_SCHEMA: 'tableview',
        FIRST_FIELD: 'nome',
      },
    },
    formValidation: {
      required: { value: true, message: 'Campo obrigatório' },
    },
    dataTableConfig: {
      orderable: false,
      RenderObjects: 'OnTable',
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
});

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

