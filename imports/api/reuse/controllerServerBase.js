
import {Meteor} from 'meteor/meteor';


export class controllerServerBase {

    constructor(model) {
        this.myCollection = model.getCollection();

        this.functions = {};

        this.publications = function (filter, projection) {
            var data = null;
            projection || (projection = {});
            check(projection, Object);
            // se existe um filtro
            if (typeof filter === "object") {
                check(filter, Object);
                return model.getCollection().find(filter, {fields: projection})
            }
            else {
                return this.ready();
            }


        }

        //Methods / funções padrões
        this.functions[model.getCollection()._name+'.insert'] = function (dataObj) {

            dataObj.userId = this.userId;
            check(dataObj, model.getCollection().simpleSchema());
            Security.can(this.userId).insert(dataObj).for(model.getCollection()).throw("Você não tem permissão para inserir clientes!!!");
            return model.getCollection().insert(dataObj, (error) => {
                if (error) {
                    console.log(error);
                }
            });
        };

        this.functions[model.getCollection()._name+'.update'] = function (id, dataObj) {

            check(id, String);
            //Resgistra o último usuário que alterou o objeto no banco
            dataObj.userId = this.userId;
            check(dataObj, model.getCollection().simpleSchema());
            Security.can(this.userId).update(id || dataObj).for(model.getCollection()).throw("Você não tem permissão para atualizar os dados do cliente!!!");
            model.getCollection().update(id, {
                $set: {
                    nome: dataObj.nome,
                    endereco: dataObj.endereco,
                    telefone: dataObj.telefone,
                    Email: dataObj.Email
                },
            });
        };

        this.functions[model.getCollection()._name+'.remove'] = function (id) {
            check(id, String);
            Security.can(this.userId).remove(id).for(model.getCollection()).throw("Você não tem permissão para remover clientes!!!");
            model.getCollection().remove(id);
        };

        this.functions['user.can.'+model.getCollection()._name+'.insert'] = function () {
            let objDataToCheck = {_id: "id_Fake_For_Permit_this_action"};
            let result = Security.can(this.userId).insert(objDataToCheck).for(model.getCollection()).check();
            return result;
        };


        this.functions['user.can.'+model.getCollection()._name+'.update'] = function (id) {
            check(id, String);
            let result = Security.can(this.userId).update(id).for(model.getCollection()).check();
            return result;
        };


        this.functions['user.can.'+model.getCollection()._name+'.remove'] = function (id) {
            check(id, String);
            let result = Security.can(this.userId).remove(id).for(model.getCollection()).check();
            return result;
        };

        this.functions['user.can.'+model.getCollection()._name+'.read'] = function (id) {
            check(id, String);
            let result = Security.can(this.userId).read(id).for(model.getCollection()).check();
            return result;
        };

    }

    applyAllMethods () {
        Meteor.methods(this.functions);
    }

    applyMethod (methodName) {
        Meteor.methods(this.functions[methodName]);
    }

    setMethod (methodName,functionDeclaration) {
        this.functions[methodName] = functionDeclaration;
        this.applyMethod(methodName);
    }

    setPublications(newPublicationsFunction) {
        this.publications = newPublicationsFunction;
        this.applyPublications();
    }

    applyPublications () {
        Meteor.publish(this.myCollection._name, this.publications);
    }

    setGroupPermissions(actionsList,groups) {
        this.myCollection.permit(actionsList).ifHasRole(groups);
    }

    setFunctionPermissions(actionsList,functionName) {
        this.myCollection.permit(actionsList)[functionName]();
    }
    
}

