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
      FIELD_TAG: 'inputH',
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

  diasdetrabalho: {
    type: [Object],
    blackbox: true,
    defaultValue: [],
    label: 'Dias de Trabalho',
    formOptions: {
      FIELD_TAG: 'multipleH',
      FIELD_TYPE: 'text',
      OPTIONS: [
        { VALUE: { dia: 'Segunda-feira', horario: '8h-18h' }, LABEL: 'Segunda-feira' },
        { VALUE: { dia: 'Terça-feira', horario: '8h-18h' }, LABEL: 'Terça-feira' },
        { VALUE: { dia: 'Quarta-feira', horario: '8h-18h' }, LABEL: 'Quarta-feira' },
        { VALUE: { dia: 'Quinta-feira', horario: '8h-18h' }, LABEL: 'Quinta-feira' },
        { VALUE: { dia: 'Sexta-feira', horario: '8h-18h' }, LABEL: 'Sexta-feira' },
        { VALUE: { dia: 'Sabado', horario: '8h-16h' }, LABEL: 'Sabado' },
        { VALUE: { dia: 'Domingo', horario: '8h-12h' }, LABEL: 'Domingo' },
      ],
      FIELD_SCHEMA: {
        dia: {
          type: String,
          defaultValue: '',
          label: 'Dia da Semana',
          formOptions: {
            FIELD_TAG: 'inputH',
            FIELD_TYPE: 'text',
          },
        },
        horario: {
          type: String,
          defaultValue: '',
          label: 'Horario',
          formOptions: {
            FIELD_TAG: 'inputH',
            FIELD_TYPE: 'text',
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
      FIELD_TAG: 'inputTaggingH',
      FIELD_TYPE: 'text',
      FIELD_SCHEMA: {
        Tecnologia: {
          type: String,
          defaultValue: '',
          label: 'Tecnologia',
          formOptions: {
            FIELD_TAG: 'inputH',
            FIELD_TYPE: 'text',
          },
        },
      },
    },
    dataTableConfig: {
      orderable: false,
      RenderObjects: 'OnTable',
    },
  },


  valor: {
    type: Number,
    defaultValue: 0,
    optional: true,
    label: 'Valor',
    formOptions: {
      FIELD_TAG: 'inputH',
      FIELD_TYPE: 'number',
      PLACEHOLDER: 'Valor',
    },
    dataTableConfig: {
      label: 'Valor',
    },
  },
  dataInicio: {
    type: Date,
    optional: true,
    label: 'Data de Início',
    formOptions: {
      FIELD_TAG: 'inputDateH',
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
      FIELD_TAG: 'inputDateH',
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
      FIELD_TAG: 'textareaH',
      ROWS: 3,
    },
    formValidation: {},
  },
  colaboradores: {
    type: [Object],
    blackbox: true,
    defaultValue: [],
    optional: true,
    label: 'Colaboradores',
    formOptions: {
      FIELD_TAG: 'multipleH',
      OPTIONSCOLLECTION: {
        COLLECTION: 'Colaboradores',
        COLLECTION_SCHEMA: 'tableview',
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
  colaboradoresOA: {
    type: [Object],
    blackbox: true,
    defaultValue: {},
    optional: true,
    label: 'ColaboradoresOA',
    formOptions: {
      FIELD_TAG: 'multipleH',
      OPTIONSCOLLECTION: {
        COLLECTION: 'Colaboradores',
        COLLECTION_SCHEMA: 'tableview',
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
    ['nome', 'dataInicio', 'diasdetrabalho', 'colaboradoresOA']);

CollectionProjetos.addSubSchema('update',
    ['nome', 'diasdetrabalho', 'dataInicio', 'dataFim', 'descricao', 'colaboradores']);

CollectionProjetos.addSubSchema('tableview',
    ['nome', 'diasdetrabalho', 'userId', 'colaboradores', 'tecnologias']);

CollectionProjetos.addSubSchema('view',
    ['nome', 'diasdetrabalho', 'colaboradores', 'dataInicio', 'tecnologias', 'userId']);

//################################################
//############ RESTRIÇÃO DE ACESSO ###############
//################################################

let permissions = [{
  actions: ['insert'],
  groups: ['administrador'], //Permissions by Functionality
},
  {
    actions: ['update', 'read'],
    groups: ['administrador'], //Permissions by Functionality
    data: { userId: "{_UserID_}" }, //Filter/Permissions by Data
  }

];

CollectionProjetos.setPermissions(permissions);

