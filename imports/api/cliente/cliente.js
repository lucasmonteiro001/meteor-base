import { Mongo } from 'meteor/mongo';


export const Cliente = new Mongo.Collection('cliente');

Cliente_Schema = new SimpleSchema({
    "nome": {
        type: String,
        defaultValue: "",
        label: "Informe um nome"
    },
    "endereco": {
        type: String,
        defaultValue: "",
        label: "Informe o Endere�o"
    },
    "telefone": {
        type: String,
        defaultValue: "",
        label: "Telefone/Cel:"
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

Cliente.attachSchema( Cliente_Schema );


