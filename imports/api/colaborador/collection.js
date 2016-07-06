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
    tableView: {
      label: 'Nome',
      template: 'tmpl',
    },
  },
  dataNascimento: {
    type: Date,
    defaultValue: '',
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
    tableView: {
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
      OPTION1: 'Administrativo Financeiro',
      OPTION2: 'Recursos Computacionais',
      OPTION3: 'Marketing',
      OPTION4: 'Processos',
      OPTION5: 'Desenho e Implementação',
      OPTION6: 'Gerência de Projetos',
      OPTION7: 'Requisitos e Análise',
      OPTION8: 'Teste',
      OPTION9: 'Usabilidade'
    },
    formValidation: {
      required: { value: true, message: 'O setor é obrigatório' },
    },
    tableView: {
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
      OPTION1: 'Colaborador do Setor',
      OPTION2: 'Líder Técnico',
      OPTION3: 'Gerente de Projetos',
      OPTION4: 'Gerente de Setor',
      OPTION5: 'Diretor de Setor',
    },
    formValidation: {
      required: { value: true, message: 'A funcao é obrigatória' },
    },
    tableView: {
      label: 'Funcao',
    },
  },
  diasTrabalhados: {
    type: String,
    defaultValue: ['', '', '', '', '', '', ''],
    label: 'Dias trabalhados',
    formOptions: {
      FIELD_TAG: 'multipleH',
      FIELD_TYPE: 'text',
      OPTION1: 'Segunda',
      OPTION2: 'Terça',
      OPTION3: 'Quarta',
      OPTION4: 'Quinta',
      OPTION5: 'Sexta',
      OPTION6: 'Sabado',
      OPTION7: 'Domingo',
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
    tableView: {
      label: 'Qtd. Dependentes',
    },
  },
  DataEntrada: {
    type: Date,
    defaultValue: '',
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
    tableView: {
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
    tableView: {
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
    tableView: {
      label: 'Email',
    },
  },
  userId: {
    type: String,
    label: 'Associated User ID',
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
    tableView: {
      label: 'TESTE'
    },
  },
  horaEntrada: {
    type: Date,
    defaultValue: '',
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
    defaultValue: '',
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
    type: [''],
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
});

CollectionColaboradores.addSubSchema('insert',
    ['nome', 'diasTrabalhados', 'inputDisabled', 'dataNascimento', 'cpf', 'login', 'setor', 'funcao',
      'dataEntrada', 'telefone', 'celular', 'email', 'quantidadeDeDependentes', 'helptext', 'horaEntrada', 'horaSaida', 'userId']);

CollectionColaboradores.addSubSchema('update',
    ['nome', 'diasTrabalhados', 'inputDisabled', 'dataNascimento', 'cpf', 'login', 'setor', 'funcao',
      'dataEntrada', 'telefone', 'celular', 'email', 'quantidadeDeDependentes', 'helptext', 'horaEntrada', 'horaSaida', 'userId']);

CollectionColaboradores.addSubSchema('view',
    ['nome', 'diasTrabalhados', 'inputDisabled', 'dataNascimento', 'cpf', 'login', 'setor', 'funcao',
      'dataEntrada', 'telefone', 'celular', 'email', 'quantidadeDeDependentes', 'helptext', 'horaEntrada', 'horaSaida', 'userId']);