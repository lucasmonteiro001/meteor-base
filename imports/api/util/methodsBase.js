
import {Meteor} from 'meteor/meteor';


export class methodsBase {

    constructor(collection) {

        this.functions = {};

        //funções padrões
        this.functions[collection._name+'.insert'] = function (dataObj) {

            dataObj.userId = this.userId;
            check(dataObj, collection.simpleSchema());
            Security.can(this.userId).insert(dataObj).for(collection).throw("Você não tem permissão para inserir clientes!!!");
            return collection.insert(dataObj, (error) => {
                if (error) {
                    console.log(error);
                }
            });
        };

        this.functions[collection._name+'.update'] = function (id, dataObj) {

            check(id, String);
            //Resgistra o último usuário que alterou o objeto no banco
            dataObj.userId = this.userId;
            check(dataObj, collection.simpleSchema());
            Security.can(this.userId).update(id || dataObj).for(collection).throw("Você não tem permissão para atualizar os dados do cliente!!!");
            collection.update(id, {
                $set: {
                    nome: dataObj.nome,
                    endereco: dataObj.endereco,
                    telefone: dataObj.telefone,
                    Email: dataObj.Email
                },
            });
        };

        this.functions[collection._name+'.remove'] = function (id) {
            check(id, String);
            Security.can(this.userId).remove(id).for(collection).throw("Você não tem permissão para remover clientes!!!");
            collection.remove(id);
        };

        this.functions['user.can.'+collection._name+'.insert'] = function () {
            let objDataToCheck = {_id: "id_Fake_For_Permit_this_action"};
            let result = Security.can(this.userId).insert(objDataToCheck).for(collection).check();
            return result;
        };


        this.functions['user.can.'+collection._name+'.update'] = function (id) {
            check(id, String);
            let result = Security.can(this.userId).update(id).for(collection).check();
            return result;
        }        ;


        this.functions['user.can.'+collection._name+'.remove'] = function (id) {
            check(id, String);
            let result = Security.can(this.userId).remove(id).for(collection).check();
            return result;
        }

        this.functions['user.can.'+collection._name+'.read'] = function (id) {
            check(id, String);
            let result = Security.can(this.userId).read(id).for(collection).check();
            return result;
        }

    }

    applyAllMethods () {
        Meteor.methods(this.functions);
    }

    applyMethod (methodName) {
        Meteor.methods(this.functions[methodName]);
    }

    addMethod (methodName,functionDeclaration) {
        this.functions[methodName] = functionDeclaration;
    }    
    
}

