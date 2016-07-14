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
        router: 'colaboradorView',
        field: '_id',
      }
    }
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
  cpf: {
    type: String,
    defaultValue: '',
    label: 'CPF',
    formOptions: {
      FIELD_TAG: 'inputMaskH',
      FIELD_TYPE: 'text',
      PLACEHOLDER: 'CPF',
      DATA_MASK: '999.999.999-99'
    },
    formValidation: {
      required: { value: true, message: 'O CPF é obrigatório' },
    }
  },
  login: {
    type: String,
    defaultValue: '',
    label: 'Login',
    formOptions: {
      FIELD_TAG: 'inputH',
      FIELD_TYPE: 'text',
      PLACEHOLDER: 'Login',
    },
    formValidation: {
      required: { value: true, message: 'O login é obrigatório' },
    },
    dataTableConfig: {
      label: 'Login',
    },
  },
  setor: {
    type: String,
    defaultValue: '',
    label: 'Setor',
    formOptions: {
      FIELD_TAG: 'selectH',
      FIELD_TYPE: 'text',
      OPTIONS_LABEL: 'Setores',
      OPTIONS: [
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
    formValidation: {
      required: { value: true, message: 'O setor é obrigatório' },
    },
    dataTableConfig: {
      label: 'Setor',
    },
  },
  funcao: {
    type: String,
    defaultValue: '',
    label: 'Funcao',
    formOptions: {
      FIELD_TAG: 'selectH',
      FIELD_TYPE: 'text',
      OPTIONS_LABEL: 'Funções',
      OPTIONS: [
        { VALUE: "", LABEL: "" },
        { VALUE: "Colaborador do Setor", LABEL: "Colaborador do Setor" },
        { VALUE: "Líder Técnico", LABEL: "Líder Técnico" },
        { VALUE: "Gerente de Projetos", LABEL: "Gerente de Projetos" },
        { VALUE: "Gerente de Setor", LABEL: "Gerente de Setor" },
        { VALUE: "Diretor de Setor", LABEL: "Diretor de Setor" },
      ],
    },
    formValidation: {
      required: { value: true, message: 'A funcao é obrigatória' },
    },
    dataTableConfig: {
      label: 'Funcao',
    },
  },
  diasTrabalhados: {
    type: Object,
    blackbox: true,
    defaultValue: {},
    label: 'Dias trabalhados',
    formOptions: {
      FIELD_TAG: 'multipleH',
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
  quantidadeDeDependentes: {
    type: Number,
    defaultValue: 0,
    optional: true,
    label: 'Quantidade de Dependentes',
    formOptions: {
      FIELD_TAG: 'inputH',
      FIELD_TYPE: 'number',
      PLACEHOLDER: 'Quantidade de dependentes'
    },
    dataTableConfig: {
      label: 'Qtd. Dependentes',
    },
  },
  dataEntrada: {
    type: Date,
    optional: true,
    label: 'Data de entrada no Synergia',
    formOptions: {
      FIELD_TAG: 'inputDateH',
      FIELD_TYPE: 'date',
    },
    formValidation: {
      required: { value: true, message: 'A Data de entrada é obrigatória' },
    },
  },
  telefone: {
    type: String,
    defaultValue: '',
    label: 'Telefone:',
    formOptions: {
      FIELD_TAG: 'inputMaskH',
      FIELD_TYPE: 'text',
      PLACEHOLDER: 'Telefone',
      DATA_MASK: '(99) 9999-9999'
    },
    formValidation: {
      required: { value: true, message: 'O telefone é obrigatório' },
    },
    dataTableConfig: {
      label: 'Telefone',
    },
  },
  celular: {
    type: String,
    defaultValue: '',
    label: 'Celular:',
    formOptions: {
      FIELD_TAG: 'inputMaskH',
      FIELD_TYPE: 'text',
      PLACEHOLDER: 'Celular',
      DATA_MASK: '(99) 99999-9999'
    },
    formValidation: {
      required: { value: true, message: 'O celular é obrigatório' },
    },
    dataTableConfig: {
      label: 'Celular',
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
      return this.userId
    },
    dataTableConfig: {
      visible: false,
      orderable: false,
      searchable: false,
    },
  },
  helptext: {
    type: String,
    defaultValue: '',
    label: 'Teste helptext',
    formOptions: {
      FIELD_TAG: 'inputHelpH',
      FIELD_TYPE: 'text',
      HELP_TEXT: 'TESTE'
    },
    formValidation: {
      required: { value: true, message: 'O nome é obrigatório' },
    },
    dataTableConfig: {
      label: 'TESTE'
    },
  },
  horaEntrada: {
    type: Date,
    optional: true,
    label: 'Hora de entrada',
    formOptions: {
      FIELD_TAG: 'inputHourH',
      FIELD_TYPE: 'time',
    },
    formValidation: {
      required: { value: true, message: 'A hora de entrada é obrigatória' },
    }
  },
  horaSaida: {
    type: Date,
    optional: true,
    label: 'Hora de saida',
    formOptions: {
      FIELD_TAG: 'inputHourH',
      FIELD_TYPE: 'time',
    },
    formValidation: {
      required: { value: true, message: 'A hora de saida é obrigatória' },
    }
  },
  inputDisabled: {
    type: String,
    defaultValue: '',
    label: 'Teste disabled',
    formOptions: {
      FIELD_TAG: 'inputDisabledH',
      FIELD_TYPE: 'text',
      VALUE: 'TESTE DISABLED',
      PLACEHOLDER: 'DISABLED'
    },
    formValidation: {
      required: { value: true, message: 'O nome é obrigatório' },
    }
  },
  descricao: {
    type: String,
    defaultValue: '',
    label: 'Descrição:',
    formOptions: {
      FIELD_TAG: 'textareaH',
      ROWS: 4
    },
    formValidation: {},
    dataTableConfig: {
      label: 'Descrição'
    }
  },
  filhos: {
    type: String,
    defaultValue: '',
    label: 'Possui filhos:',
    formOptions: {
      FIELD_TAG: 'checkboxH',
      FIELD_TYPE: 'checkbox',
    },
    formValidation: {
      required: { value: true, message: 'O nome é obrigatório' },
    }
  },
  radio: {
    type: String,
    defaultValue: '',
    label: 'Aceita os termos:',
    formOptions: {
      FIELD_TAG: 'radioButtonH',
      FIELD_TYPE: 'radio',
    },
    formValidation: {
      required: { value: true, message: 'O radio é obrigatório' },
    }
  },
  checks: {
    type: String,
    defaultValue: '',
    label: 'Possui filhos:',
    formOptions: {
      FIELD_TAG: 'checkboxNH',
      FIELD_TYPE: 'checkbox',
      LABELS: [
        { VALUE: "TESTE01", LABEL: "TESTE01", NAME: "TESTE01", FOR: "TESTE01" },
        { VALUE: "TESTE02", LABEL: "TESTE02", NAME: "TESTE02", FOR: "TESTE02" },
        { VALUE: "TESTE03", LABEL: "TESTE03", NAME: "TESTE03", FOR: "TESTE03" },
      ],
    },
    formValidation: {
      required: { value: true, message: 'O nome é obrigatório' },
    }
  },
  radios: {
    type: String,
    defaultValue: '',
    label: 'Possui filhos:',
    formOptions: {
      FIELD_TAG: 'radioNH',
      FIELD_TYPE: 'checkbox',
      LABELS: [
        { VALUE: "TESTE01", LABEL: "TESTE01", NAME: "TESTE01", FOR: "TESTE01" },
        { VALUE: "TESTE02", LABEL: "TESTE02", NAME: "TESTE02", FOR: "TESTE02" },
        { VALUE: "TESTE03", LABEL: "TESTE03", NAME: "TESTE03", FOR: "TESTE03" },
      ],
    },
    formValidation: {
      required: { value: true, message: 'O nome é obrigatório' },
    }
  },
  spans: {
    type: String,
    defaultValue: '',
    label: 'Possui filhos:',
    formOptions: {
      FIELD_TAG: 'spanNH',
      FIELD_TYPE: 'text',
      SPANS: [
        { VALUE: "TESTE01", ID: "TESTE01" },
        { VALUE: "TESTE02", ID: "TESTE02" },
      ],
    },
    formValidation: {
      required: { value: true, message: 'O nome é obrigatório' },
    }
  },
  inputs: {
    type: String,
    defaultValue: '',
    label: 'Possui filhos:',
    formOptions: {
      FIELD_TAG: 'inputNH',
      FIELD_TYPE: 'text',
      INPUTS: [
        { VALUE: "", ID: "TESTE01", PLACEHOLDER: "TESTE01", NAME: "TESTE01" },
        { VALUE: "", ID: "TESTE02", PLACEHOLDER: "TESTE02", NAME: "TESTE02" },

      ],
    },
    formValidation: {
      required: { value: true, message: 'O nome é obrigatório' },
    }
  },
  // cropper: {
  //   type: String,
  //   defaultValue: '',
  //   label: 'Imagem:',
  //   formOptions: {
  //     FIELD_TAG: 'imageCropper'
  //   }
  // }
});

CollectionColaboradores.addSubSchema('insert',
    ['nome', 'email']);

CollectionColaboradores.addSubSchema('update',
    ['nome', 'testeObj', 'inputDisabled', 'descricao', 'radios', 'checks', 'radio', 'filhos', 'diasTrabalhados', 'dataNascimento', 'cpf', 'login', 'setor',
      'funcao', 'dataEntrada', 'telefone', 'celular', 'email', 'quantidadeDeDependentes', 'helptext', 'horaEntrada', 'horaSaida']);

CollectionColaboradores.addSubSchema('view',
    ['nome', 'testeObj', 'inputDisabled', 'descricao', 'radios', 'checks', 'radio', 'filhos', 'diasTrabalhados', 'dataNascimento', 'cpf', 'login', 'setor',
      'funcao', 'dataEntrada', 'telefone', 'celular', 'email', 'quantidadeDeDependentes', 'helptext', 'horaEntrada', 'horaSaida', 'userId']);

CollectionColaboradores.addSubSchema('tableview',
    ['nome', 'email', 'userId']);

CollectionColaboradores.addSubSchema('selection',
    ['nome', 'horaSaida']);