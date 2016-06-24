import { CollectionBase } from '../reuse/collectionBase';
export const CollectionContatos = new CollectionBase('Contatos');

CollectionContatos.setSchema({
  'nome': {
    type: String,
    defaultValue: '',
    label: 'Informe um nome',
  },
  'telefone': {
    type: String,
    defaultValue: '',
    label: 'Telefone/Cel:',
  },
  'userId': {
    type: String,
    label: 'Associated User ID',
  },
});
