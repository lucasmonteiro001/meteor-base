import {CollectionBase} from '../reuse/collectionBase';

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
            required: {value: true, message: 'O nome é obrigatório'},
        },
        tableView: {
            label: 'Nome',
            template: 'tmpl',
        },
    },
    testeObj: {
        type: Object,
        defaultValue: '',
        label: 'teste',
        formOptions: {
            FIELD_TAG: 'multipleH',
            FIELD_TYPE: 'text',
            OPTIONS: [
                {VALUE: {campo1: 'valueCampo1', campo2: 'valueCampo2'}, LABEL: "Administrativo Financeiro"},
                {VALUE: {campo1: 'valueCampo1X', campo2: 'valueCampo2X'}, LABEL: "Recursos Computacionais"},
            ],
            FIELD_SCHEMA: {
                campo1: {
                    type: String,
                    defaultValue: '',
                    optional: true,
                    label: 'Campo01',
                    formOptions: {
                        FIELD_TAG: 'inputH',
                        FIELD_TYPE: 'text',
                    },
                    formValidation: {
                        required: {value: true, message: 'Esse campo é obrigatória'},
                    },
                },
                campo2: {
                    type: String,
                    defaultValue: '',
                    optional: true,
                    label: 'Campo02',
                    formOptions: {
                        FIELD_TAG: 'inputH',
                        FIELD_TYPE: 'text',
                    },
                    formValidation: {
                        required: {value: true, message: 'Esse campo é obrigatória'},
                    },
                },
            }
        },
        formValidation: {
            required: {value: true, message: 'O Teste é obrigatório'},
        },
        tableView: {
            label: 'Teste',
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
            required: {value: true, message: 'A Data de Nascimento é obrigatória'},
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
            required: {value: true, message: 'O CPF é obrigatório'},
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
            required: {value: true, message: 'O login é obrigatório'},
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
            OPTIONS: [
                {VALUE:"Administrativo Financeiro",LABEL:"Administrativo Financeiro"},
                {VALUE:"Recursos Computacionais",LABEL:"Recursos Computacionais"},
                {VALUE:"Marketing",LABEL:"Marketing"},
                {VALUE:"Processos",LABEL:"Processos"},
                {VALUE:"Desenho e Implementação",LABEL:"Desenho e Implementação"},
                {VALUE:"Gerência de Projetos",LABEL:"Gerência de Projetos"},
                {VALUE:"Requisitos e Análise",LABEL:"Requisitos e Análise"},
                {VALUE:"Teste",LABEL:"Teste"},
                {VALUE:"Usabilidade",LABEL:"Usabilidade"},
            ],
        },
        formValidation: {
            required: {value: true, message: 'O setor é obrigatório'},
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
            OPTIONS: [
                {VALUE:"Colaborador do Setor",LABEL:"Colaborador do Setor"},
                {VALUE:"Líder Técnico",LABEL:"Líder Técnico"},
                {VALUE:"Gerente de Projetos",LABEL:"Gerente de Projetos"},
                {VALUE:"Gerente de Setor",LABEL:"Gerente de Setor"},
                {VALUE:"Diretor de Setor",LABEL:"Diretor de Setor"} ,
            ],
        },
        formValidation: {
            required: {value: true, message: 'A funcao é obrigatória'},
        },
        tableView: {
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
                {VALUE: 'Segunda-Feira', LABEL: 'Segunda-feira'},
                {VALUE: "Terça-Feira", LABEL: "Terça-feira"},
                {VALUE: "Quarta-Feira", LABEL: "Quarta-feira"},
                {VALUE: "Quinta-Feira", LABEL: "Quinta-feira"},
                {VALUE: "Sexta-Feira", LABEL: "Sexta-feira"},
                {VALUE: "Sabado", LABEL: "Sabado"},
                {VALUE: "Domingo", LABEL: "Domingo"},
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
        tableView: {
            label: 'Qtd. Dependentes',
        },
    },
    dataEntrada: {
        type: Date,
        defaultValue: '',
        optional: true,
        label: 'Data de entrada no Synergia',
        formOptions: {
            FIELD_TAG: 'inputDateH',
            FIELD_TYPE: 'date',
        },
        formValidation: {
            required: {value: true, message: 'A Data de entrada é obrigatória'},
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
            required: {value: true, message: 'O telefone é obrigatório'},
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
            required: {value: true, message: 'O celular é obrigatório'},
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
            required: {value: true, message: 'O email é obrigatório'},
            email: {value: true, message: 'O email informado não é válido'},
        },
        tableView: {
            label: 'Email',
        },
    },
    userId: {
        type: String,
        label: 'Associated User ID',
        autoValue: function () {
            return this.userId
        }
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
            required: {value: true, message: 'O nome é obrigatório'},
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
            required: {value: true, message: 'A hora de entrada é obrigatória'},
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
            required: {value: true, message: 'A hora de saida é obrigatória'},
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
            required: {value: true, message: 'O nome é obrigatório'},
        }
    },
});

CollectionColaboradores.addSubSchema('insert',
    ['nome', 'testeObj', 'diasTrabalhados', 'inputDisabled', 'dataNascimento', 'cpf', 'login', 'setor', 'funcao',
        'dataEntrada', 'telefone', 'celular', 'email', 'quantidadeDeDependentes', 'helptext', 'horaEntrada', 'horaSaida']);

CollectionColaboradores.addSubSchema('update',
    ['nome', 'testeObj', 'diasTrabalhados', 'inputDisabled', 'dataNascimento', 'cpf', 'login', 'setor', 'funcao',
        'dataEntrada', 'telefone', 'celular', 'email', 'quantidadeDeDependentes', 'helptext', 'horaEntrada', 'horaSaida']);

CollectionColaboradores.addSubSchema('view',
    ['nome', 'testeObj', 'diasTrabalhados', 'inputDisabled', 'dataNascimento', 'cpf', 'login', 'setor', 'funcao',
        'dataEntrada', 'telefone', 'celular', 'email', 'quantidadeDeDependentes', 'helptext', 'horaEntrada', 'horaSaida']);