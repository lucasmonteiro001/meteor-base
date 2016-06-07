import {Meteor} from 'meteor/meteor';

export class methodsBase {

    constructor(collection) {
        const myCollection = collection;
        const insertMethod = myCollection._name+'.insert';
        Meteor.methods({
            insertMethod (dataObj) {

                dataObj.userId = this.userId;
                check(dataObj, Cliente.simpleSchema());
                Security.can(this.userId).insert(dataObj).for(Cliente).throw("Você não tem permissão para inserir clientes!!!");
                return Cliente.insert(dataObj, (error) => {
                    if (error) {
                        console.log(error);
                    }
                });
            },
            'cliente.update' (id, dataObj) {

                check(id, String);
                //Resgistra o último usuário que alterou o objeto no banco
                dataObj.userId = this.userId;
                check(dataObj, Cliente.simpleSchema());
                Security.can(this.userId).update(id || dataObj).for(Cliente).throw("Você não tem permissão para atualizar os dados do cliente!!!");
                Cliente.update(id, {
                    $set: {
                        nome: dataObj.nome,
                        endereco: dataObj.endereco,
                        telefone: dataObj.telefone,
                        Email: dataObj.Email
                    },
                });
            },
            'cliente.remove'(id) {
                check(id, String);
                Security.can(this.userId).remove(id).for(Cliente).throw("Você não tem permissão para remover clientes!!!");
                Cliente.remove(id);
            },
            'user.can.cliente.insert' () {
                let objDataToCheck = {_id: "id_Fake_For_Permit_this_action"};
                let result = Security.can(this.userId).insert(objDataToCheck).for(Cliente).check();
                return result;
            },
            'user.can.cliente.update' (id) {
                check(id, String);
                let result = Security.can(this.userId).update(id).for(Cliente).check();
                return result;
            },
            'user.can.cliente.remove'(id) {
                check(id, String);
                let result = Security.can(this.userId).remove(id).for(Cliente).check();
                return result;
            },
            'user.can.cliente.read'(id) {
                check(id, String);
                let result = Security.can(this.userId).read(id).for(Cliente).check();
                return result;
            }

        });

    }
}

