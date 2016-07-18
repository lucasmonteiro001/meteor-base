import {CollectionBase} from '../reuse/collectionBase';

export const CollectionProduto = new CollectionBase('Produto');

//Definição dos Schemas
CollectionProduto.setSchema({
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
            required: {value: true, message: 'O nome é obrigatório'},
        },
        tableView: {
            label: 'Nome',
            template: 'tmpl',
        },
    },
    DataNascimento: {
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
    userId: {
        type: String,
        label: 'Associated User ID',
    },
});

CollectionProduto.addSubSchema('insert', ['nome', 'DataNascimento', 'userId']);

CollectionProduto.addSubSchema('update',
    ['nome', 'DataNascimento']);

CollectionProduto.addSubSchema('view',
    ['nome', 'DataNascimento']);
