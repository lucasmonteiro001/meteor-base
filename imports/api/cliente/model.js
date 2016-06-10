import { modelBase } from '../reuse/modelBase';

export const model = new modelBase('cliente');

model.setSchema({
    "endereco": {
        type: String,
        defaultValue: "",
        label: "Informe o Endereço"
    },
    "telefone": {
        type: String,
        defaultValue: "",
        label: "Telefone/Cel:"
    },
    "nome": {
        type: String,
        defaultValue: "",
        label: "Informe um nome"
    },
    "Email": {
        type: String,
        defaultValue: "",
        label: "Meu Email"
    },

    "userId": {
        type: String,
        label: "Associated User ID"
    }
});





