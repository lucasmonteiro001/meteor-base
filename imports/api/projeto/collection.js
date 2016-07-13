import { CollectionBase } from '../reuse/collectionBase';

export const CollectionProjetos = new CollectionBase('Projetos');

//Definição dos Schemas
CollectionProjetos.setSchema({
  nome: {
    type: String,
    defaultValue: '',
    label: 'Nome',
    formOptions: {
      FIELD_TAG: 'inputH',
      FIELD_TYPE: 'text',
      PLACEHOLDER: 'Nome'
    },
    formValidation: {
      required: { value: true, message: 'O nome é obrigatório' }
    },
    dataTableConfig: {
      title: 'Novo_Nome',
      link: {
        router: 'projetoView',
        field: '_id',
      }
    }
  },
  diasdetrabalho: {
    type: Object,
    blackbox: true,
    defaultValue: {},
    label: 'Dias de Trabalho',
    formOptions: {
      FIELD_TAG: 'multipleH',
      FIELD_TYPE: 'text',
      OPTIONS: [
        { VALUE: { campo1: "valorCampo01", campo2: "valorCampo02" }, LABEL: 'Segunda-feira' },
        { VALUE: { campo1: "A", campo2: "G" }, LABEL: "Terça-feira" },
        { VALUE: { campo1: "B", campo2: "H" }, LABEL: "Quarta-feira" },
        { VALUE: { campo1: "C", campo2: "I" }, LABEL: "Quinta-feira" },
        { VALUE: { campo1: "D", campo2: "J" }, LABEL: "Sexta-feira" },
        { VALUE: { campo1: "E", campo2: "K" }, LABEL: "Sabado" },
        { VALUE: { campo1: "F", campo2: "L" }, LABEL: "Domingo" },
      ],
      FIELD_SCHEMA: {
        campo1: {
          type: String,
          defaultValue: '',
          label: 'Campo01',
          formOptions: {
            FIELD_TAG: 'inputH',
            FIELD_TYPE: 'text',
            PLACEHOLDER: 'Nome'
          },
        },
        campo2: {
          type: String,
          defaultValue: '',
          label: 'Campo02',
          formOptions: {
            FIELD_TAG: 'inputH',
            FIELD_TYPE: 'text',
            PLACEHOLDER: 'Nome'
          },
        },

      }
    },
    dataTableConfig: {
      orderable: false,
      RenderObjects: "OnTable",
    }
  },
  valor: {
    type: Number,
    defaultValue: 0,
    optional: true,
    label: 'Valor',
    formOptions: {
      FIELD_TAG: 'inputH',
      FIELD_TYPE: 'number',
      PLACEHOLDER: 'Valor'
    },
    dataTableConfig: {
      label: 'Valor'
    }
  },
  dataInicio: {
    type: String,
    defaultValue: '',
    optional: true,
    label: 'Data de Início',
    formOptions: {
      FIELD_TAG: 'inputDateH',
      FIELD_TYPE: 'date'
    },
    formValidation: {
      required: { value: true, message: 'A data de início é obrigatória' },
      date: {value:true, message: 'O valor informado não é uma data válida'}
    },
    dataTableConfig: {
      label: 'Data de Início'
    }
  },
  dataFim: {
    type: String,
    defaultValue: '',
    optional: true,
    label: 'Data de Fim',
    formOptions: {
      FIELD_TAG: 'inputDateH',
      FIELD_TYPE: 'date'
    },
    formValidation: {
      //date: {value:true, message: 'O valor informado não é uma data válida'}
    },
  },
  descricao: {
    type: String,
    defaultValue: '',
    label: 'Descrição:',
    formOptions: {
      FIELD_TAG: 'textareaH',
      ROWS: 3
    },
    formValidation: {

    },
    dataTableConfig: {
      label: 'Descrição'
    }
  },
  colaboradores: {
    type: Object,
    blackbox: true,
    defaultValue: {},
    optional: true,
    label: 'Colaboradores',
    formOptions: {
      FIELD_TAG: 'multipleH',
      OPTIONS: [{LABEL:'VALOR1',VALUE:'VALOR01'},{LABEL:'VALOR2',VALUE:{campo1:'valueCampo1',campo2:'valorcampo2'} },{LABEL:'VALOR3',VALUE:'VALOR03'}],
      OPTIONSCOLLECTION: {
        COLLECTION: "colaboradores",
        COLLECTION_SCHEMA: "insert"
      }
    },
    formValidation: {

    },
  },
  userId: {
    type: String,
    label: 'Associated User ID',
    autoValue: function () {
      return this.userId
    }
  }
});

CollectionProjetos.addSubSchema('insert',
    ['nome', 'dataInicio', 'diasdetrabalho', 'colaboradores']);

CollectionProjetos.addSubSchema('update',
    ['nome', 'diasdetrabalho', 'dataInicio', 'dataFim', 'descricao', 'colaboradores']);

CollectionProjetos.addSubSchema('view',
    ['nome', 'descricao', 'dataInicio', 'dataFim', 'colaboradores', 'diasdetrabalho']);

