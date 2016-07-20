/**
 * <p>
 * Finalidade da Classe: Aplicar os métodos para a
 * manipulação de uma collection, baseado nos
 * métodos definidos pelo framework Synergia Meteor.
 * </p>
 *
 * <p>
 * Copyright: Copyright (c) Synergia - DCC - UFMG
 * </p>
 *
 * @author mfpinheiro
 * @author Última modificação realizada por : mfpinheiro $.
 * @version :: 21/06/2016#$.
 *
 */
import {Meteor} from "meteor/meteor";
import {Random} from "meteor/random";

export class ModelBase {

    /**
     * Construtor
     * @param collectionBase - Collection que será passada para o construtor
     * @param isTest - Modo de teste
     */
    constructor(collectionBase, isTest = false) {

        this.myCollection = collectionBase.getCollection();

        this.myCollectionBase = collectionBase;


        this.collectionsModelDependents = [];

        this.functions = {};

        this.isTest = isTest;

        this.publications = function (filter, projection) {
            var data = null;
            projection || (projection = {});
            check(projection, Object);

            // se existe um filtro
            if (typeof filter === 'object') {
                check(filter, Object);
                return collectionBase.getCollection().find(filter, {fields: projection});
            } else {
                return this.ready();
            }

        };

        //##################################################
        //###Inicialização de métodos de validaão###########
        //##################################################

        this.functions['user.can.' + collectionBase.getCollection()._name + '.insert']
            = function (userId = this.userId) {
            let objDataToCheck = {_id: 'id_Fake_For_Permit_this_action'};
            return Security.can(userId).insert(objDataToCheck)
                .for(collectionBase.getCollection()).check();
        };

        this.functions['user.can.' + collectionBase.getCollection()._name + '.update']
            = function (id, userId = this.userId) {
            check(id, String);
            return Security.can(userId).update(id).for(collectionBase.getCollection()).check();
        };

        this.functions['user.can.' + collectionBase.getCollection()._name + '.remove']
            = function (id, userId = this.userId) {
            check(id, String);
            return Security.can(userId).remove(id).for(collectionBase.getCollection()).check();

        };

        this.functions['user.can.' + collectionBase.getCollection()._name + '.read']
            = function (id, userId = this.userId) {
            check(id, String);
            return Security.can(userId).read(id).for(collectionBase.getCollection()).check();

        };

        this.functions['get.' + collectionBase.getCollection()._name + '.permissions']
            = function () {
            return collectionBase.getPermissions();
        };        
        
        //##################################################
        //###Inicialização de métodos que alteram o banco###
        //##################################################

        this.functions[collectionBase.getCollection()._name + '.insert']
            = function (dataObj) {

            /**
             * DESCOMENTE PARA EXECUTAR OS TESTES
             */
            //checkIfisTestMode(dataObj);

            //dataObj.userId = Meteor.userId();

            check(dataObj, collectionBase.getSchema('insert'));

            if ((!Security.can(this.userId).insert(dataObj).for(collectionBase.getCollection()).check())
                && this.isTest === false) {
                throw new Meteor.Error('Acesso Negado',
                    'Você não tem permissão para executar essa ação!');
            } else {
                return collectionBase.getCollection().insert(dataObj, (error) => {
                    if (error) {
                        console.log(error);
                    }
                });
            }
        };

        this.functions[collectionBase.getCollection()._name + '.update'] = function (id, dataObj) {

            check(id, String);
            check(dataObj, collectionBase.getSchema('update'));

            if (!Security.can(this.userId).update(id || dataObj)
                    .for(collectionBase.getCollection()).check() && this.isTest === false) {
                throw new Meteor.Error('Acesso Negado',
                    'Você não tem permissão para executar essa ação!');
            } else {

                collectionBase.getCollection().update(id, {
                    $set: dataObj,
                });
            }
        };

        this.functions[collectionBase.getCollection()._name + '.remove'] = function (id) {
            check(id, String);
            if (!Security.can(this.userId).remove(id).for(collectionBase.getCollection()).check()
                && this.isTest === false) {
                throw new Meteor.Error('Acesso Negado',
                    'Você não tem permissão para executar essa ação!');
            } else {
                collectionBase.getCollection().remove(id);
            }
        };

        //####################### Hooks ##################################
        //####################### Hooks ##################################
        //####################### Hooks ##################################
        //####################### Hooks ##################################

    }

    /**
     * Inicializa todos os métodos que são executados no servidor, referente ao modelo.
     */
    applyAllMethods() {
        Meteor.methods(this.functions);
        return true;
    }

    /**
     * Retorna todos os métodos em uso
     * @returns {*|any}
     */
    getAllApplyMethods() {
        return Meteor.methods(this.functions);
    }

    setCollectionModelDependent(collectionModel) {
        console.log('Model dependente relacionado ao model Colaborador');
        this.collectionsModelDependents.push(collectionModel);

        this.myCollection.before.remove(function (userId, doc) {
            console.log('Tentativa de remoção');
            console.log(this.collectionsModelDependents);

            for (let key in this.collectionsModelDependents) {
                console.log('Nome:' + this.collectionsModelDependents[key]._name);
            }

        });

    }

    getCollectionName() {
        return this.myCollection._name;
    }

    /**
     * Inicializa o método informado
     * @param methodName Nome do método que será inicializado no servidor.
     */
    applyMethod(methodName) {
        Meteor.methods(this.functions[methodName]);
    }

    /**
     * Aplica os métodos que serão executados no servidor
     * @param methodName
     * @param functionDeclaration
     */
    setMethod(methodName, functionDeclaration) {
        this.functions[methodName] = functionDeclaration;
        this.applyMethod(methodName);
    }

    /**
     * Aplica as publicações para a collection
     * @param newPublicationsFunction
     */
    setPublications(newPublicationsFunction) {
        this.publications = newPublicationsFunction;
        this.applyPublications();
    }

    /**
     * Faz a publicação da collection
     */
    applyPublications() {
        Meteor.publish(this.myCollection._name, this.publications);
    }

    /**
     * Aplica as permissões de grupo para a collection
     * @param actionsList
     * @param groups
     */
    setGroupPermissions(actionsList, groups) {
        this.myCollection.permit(actionsList).ifHasRole(groups);
    }

    /**
     * Aplica as permissões de ações para a collection, por usuário.
     * @param actionsList
     * @param functionName
     */
    setFunctionPermissions(actionsList, permissions) {

// Por exemplo: O usuário só pode alterar registros criados por ele ou se ele
// pertencer à regra 'Administrador'.
// Para mais informações sobre o uso do módulo Roles veja:
// http://alanning.github.io/meteor-roles/classes/Roles.html#method_userIsInRole

        if (typeof permissions.byData != 'undefined') {

            Security.defineMethod(this.getCollectionName() + 'Permissions', {
                fetch: [],
                allow(type, field, userId, doc) {
                    let result = true;

                    for (let key in permissions.byData) {
                        if (doc[key] != permissions.byData[key])
                            result = false;
                    }


                    return result && Roles.userIsInRole(userId, permissions.byRoles);
                },
            });

            this.myCollection.permit(actionsList)[this.getCollectionName() + 'Permissions']();
        }

    }
}
;
