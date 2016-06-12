
import {Meteor} from 'meteor/meteor';


export class modelBase {

    constructor(collectionBase) {
        this.myCollection = collectionBase.getCollection();

        this.functions = {};

        this.publications = function (filter, projection) {
            var data = null;
            projection || (projection = {});
            check(projection, Object);
            // se existe um filtro
            if (typeof filter === "object") {
                check(filter, Object);
                return collectionBase.getCollection().find(filter, {fields: projection})
            }
            else {
                return this.ready();
            }


        }

        //Methods / funções padrões
        this.functions[collectionBase.getCollection()._name+'.insert'] = function (dataObj) {

            dataObj.userId = this.userId;
            check(dataObj, collectionBase.getCollection().simpleSchema());
            Security.can(this.userId).insert(dataObj).for(collectionBase.getCollection()).throw("Você não tem permissão para inserir clientes!!!");
            return collectionBase.getCollection().insert(dataObj, (error) => {
                if (error) {
                    console.log(error);
                }
            });
        };

        this.functions[collectionBase.getCollection()._name+'.update'] = function (id, dataObj) {

            check(id, String);
            //Resgistra o último usuário que alterou o objeto no banco
            dataObj.userId = this.userId;
            check(dataObj, collectionBase.getCollection().simpleSchema());
            Security.can(this.userId).update(id || dataObj).for(collectionBase.getCollection()).throw("Você não tem permissão para atualizar os dados do cliente!!!");
            collectionBase.getCollection().update(id, {
                $set: {
                    nome: dataObj.nome,
                    endereco: dataObj.endereco,
                    telefone: dataObj.telefone,
                    Email: dataObj.Email
                },
            });
        };

        this.functions[collectionBase.getCollection()._name+'.remove'] = function (id) {
            check(id, String);
            Security.can(this.userId).remove(id).for(collectionBase.getCollection()).throw("Você não tem permissão para remover clientes!!!");
            collectionBase.getCollection().remove(id);
        };

        this.functions['user.can.'+collectionBase.getCollection()._name+'.insert'] = function () {
            let objDataToCheck = {_id: "id_Fake_For_Permit_this_action"};
            let result = Security.can(this.userId).insert(objDataToCheck).for(collectionBase.getCollection()).check();
            return result;
        };


        this.functions['user.can.'+collectionBase.getCollection()._name+'.update'] = function (id) {
            check(id, String);
            let result = Security.can(this.userId).update(id).for(collectionBase.getCollection()).check();
            return result;
        };


        this.functions['user.can.'+collectionBase.getCollection()._name+'.remove'] = function (id) {
            check(id, String);
            let result = Security.can(this.userId).remove(id).for(collectionBase.getCollection()).check();
            return result;
        };

        this.functions['user.can.'+collectionBase.getCollection()._name+'.read'] = function (id) {
            check(id, String);
            let result = Security.can(this.userId).read(id).for(collectionBase.getCollection()).check();
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

