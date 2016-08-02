import { CollectionBase } from '../reuse/collectionBase';

export const CollectionColaboradores = new CollectionBase('Colaboradores');

CollectionColaboradores.setSchema({
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
  addInfo: {
    type: Object,
    defaultValue: '',
    label: 'Adicionar Informacoes',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'addInfoH',
      CONTROLLER: 'Colaboradores',
      SCHEMANAME: 'teste',
      FIELD_SCHEMA: {
        dia: {
          type: String,
          defaultValue: '',
          label: 'Dia da Semana',
          formOptions: {
            FIELD_COMPONENT: 'inputH',
            FIELD_TYPE: 'text',
          }
        },
        horario: {
          type: String,
          defaultValue: '',
          label: 'Horario',
          formOptions: {
            FIELD_COMPONENT: 'inputH',
            FIELD_TYPE: 'text',
          }
        }
      }
    }
  },
  cpf: {
    type: String,
    defaultValue: '',
    label: 'CPF',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'inputMaskH',
      DATA_MASK: '999.999.999-99',
    },
  },
  helptext: {
    type: String,
    defaultValue: '',
    label: 'Teste helptext',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'inputHelpH',
      FIELD_TYPE: 'text',
      HELP_TEXT: 'Digite exatamente assim! :)'
    },
  },
  horaEntrada: {
    type: Date,
    defaultValue: '',
    optional: true,
    label: 'Hora de entrada',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'inputHourH',
      FIELD_TYPE: 'time',
    },
  },
  descricao: {
    type: String,
    defaultValue: '',
    label: 'Descrição:',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'textareaH',
      ROWS: 4
    },
  },
  filhos: {
    type: String,
    defaultValue: '',
    label: 'Possui filhos:',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'checkboxH',
    },
  },
  radio: {
    type: String,
    defaultValue: '',
    label: 'Aceita os termos:',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'radioH',
    },
    formValidation: {
      required: { value: true, message: 'O radio é obrigatório' },
    }
  },
  range: {
    type: String,
    defaultValue: '',
    label: 'Volume:',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'rangeH',
    },
    formValidation: {
      required: { value: true, message: 'O radio é obrigatório' },
    }
  },
  diasTrabalhados: {
    type: Object,
    blackbox: true,
    defaultValue: {},
    label: 'Dias trabalhados',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'multipleH',
      FIELD_TYPE: 'text',
      OPTIONS: [
        { VALUE: 'Segunda-Feira', LABEL: 'Segunda-feira' },
        { VALUE: "Terça-Feira", LABEL: "Terça-feira" },
        { VALUE: "Quarta-Feira", LABEL: "Quarta-feira" },
        { VALUE: "Quinta-Feira", LABEL: "Quinta-feira" },
        { VALUE: "Sexta-Feira", LABEL: "Sexta-feira" },
        { VALUE: "Sabado", LABEL: "Sabado" },
        { VALUE: "Domingo", LABEL: "Domingo" },
      ],
    },
  },
  setor: {
    type: String,
    defaultValue: '',
    label: 'Setor',
    formOptions: {
      VISIBLE: true,
      FIELD_COMPONENT: 'selectH',
      FIELD_TYPE: 'text',
      OPTIONS_LABEL: 'Setores',
      SELECTS: [
        { VALUE: "", LABEL: "" },
        { VALUE: "Administrativo Financeiro", LABEL: "Administrativo Financeiro" },
        { VALUE: "Recursos Computacionais", LABEL: "Recursos Computacionais" },
        { VALUE: "Marketing", LABEL: "Marketing" },
        { VALUE: "Processos", LABEL: "Processos" },
        { VALUE: "Desenho e Implementação", LABEL: "Desenho e Implementação" },
        { VALUE: "Gerência de Projetos", LABEL: "Gerência de Projetos" },
        { VALUE: "Requisitos e Análise", LABEL: "Requisitos e Análise" },
        { VALUE: "Teste", LABEL: "Teste" },
        { VALUE: "Usabilidade", LABEL: "Usabilidade" },
      ],
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
      RenderObjects: 'OnTable',
    },
  },
});

CollectionColaboradores.addSubSchema('teste',
    ['dia', 'horario']);

CollectionColaboradores.addSubSchema('insert',
    ['nome', 'dataNascimento', 'email', 'addInfo', 'cpf', 'setor', 'diasTrabalhados',
      'helptext', 'horaEntrada', 'descricao', 'filhos', 'radio', 'range', 'tecnologias']);

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

