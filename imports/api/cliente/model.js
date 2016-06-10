import { modelBase } from '../util/modelBase'; 

modelCliente = new modelBase('cliente');

modelCliente.setSchema({
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

export const clienteModel = modelCliente.getCollection();



