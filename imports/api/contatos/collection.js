import {CollectionBase} from '../reuse/collectionBase';
export const collectionContato = new CollectionBase('contatos');

collectionContato.setSchema({
    'nome': {
        type: String,
        defaultValue: '',
        label: 'Informe um nome'
    },
    'telefone': {
        type: String,
        defaultValue: '',
        label: 'Telefone/Cel:'
    },
    'userId': {
        type: String,
        label: 'Associated User ID'
    }
});





