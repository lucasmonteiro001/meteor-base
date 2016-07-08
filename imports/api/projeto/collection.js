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
    tableView: {
      label: 'Nome',
      template: 'tmpl'
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
    tableView: {
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
    tableView: {
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
    tableView: {
      label: 'Data de Fim'
    }
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
    tableView: {
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
        COLLECTION: "colaborador",
        COLLECTION_SCHEMA: "inserir"
      }
    },
    formValidation: {

    },
    tableView: {
      label: 'Colaboradores'
    }
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
    ['nome', 'dataInicio', 'descricao', 'colaboradores']);

CollectionProjetos.addSubSchema('update',
    ['nome', 'valor', 'dataInicio', 'dataFim', 'descricao','colaboradores']);

CollectionProjetos.addSubSchema('view',
    ['nome', 'descricao', 'dataInicio', 'dataFim', 'colaboradores', 'valor']);

