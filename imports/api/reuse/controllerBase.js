import { Mongo } from 'meteor/mongo';

export class ControllerBase {
  /**
   * Construtor base para uma collection
   * Recebe uma collection como parâmetro
   * @param collection
   */
  constructor (collectionBase) {
    this.myCollection = collectionBase.getCollection();
    this.myCollectionBase = collectionBase;
    this.filter = {};
    this.projection = { default: {} };

  }

  /**
   * Acidiona um filter criado para a collection
   * @param filter
   */
  setFilter (filter) {
    this.filter = filter;
  }

  /**
   * Acidiona um projection para a collection
   * @param Nome_da_projection
   * @param Dados_da_projection
   */
  setProjection (projectionName, projectionData) {
    this.projection[projectionName] = projectionData;
  }

  /**
   * Retorna todos os documentos de uma collection
   * @returns Todos os documentos de uma collection
   */
  getAll () {
    const resultado = this.myCollection.find();
    if (resultado)
      return resultado;
  }

  /**
   * Retorna a collection referente ao controller.
   * @returns A collection (objeto json)
   */
  getCollection () {
    return this.myCollection;

  }

  /**
   * Retorna somente o nome da collection referente ao controller.
   * @returns O nome da collection
   */
  getCollectionName () {
    return this.myCollection._name;
  }

  getSchemaExceptFields (schemaName = 'default', fields) {
    return this.myCollectionBase.getSchemaExceptFields(schemaName, fields);
  }

  getSchema (schemaName = 'default') {
    return this.myCollectionBase.getSchema(schemaName);
  }

  getSchemaJson (schemaName = 'default') {
    return this.myCollectionBase.getSchemaJson(schemaName);
  }

  /**
   * Consulta um documento na collection pelo _id
   * @param _id do documento
   * @returns retorna o documento correspondente ao _id
   */
  get (id) {
    let document = this.myCollection.findOne(id);
    if (document != 0) {
      return document;
    } else {
      return console.log('Documento não encontrado');
    }
  }

  applySubscribe (template, id = '', action = 'default') {
    let filterTmp = this.filter;
    if (id != '') {
      filterTmp._id = id;
    } else {
      delete filterTmp._id;
    }

    return template.subscribe(this.getCollectionName(), filterTmp, this.projection[action]);
  }

  /**
   * Insere um documento na collection
   * @param collectionData Dados que serão inseridos
   * @param callback Função para tratar o retorno da insersao(erro ou acerto)
   */
  insert (collectionData, callback) {
    Meteor.call(this.getCollectionName() + '.insert', collectionData, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  }

  /**
   * Faz um update de um documento na collection
   * @param id Do objeto que será alterado
   * @param collectionData Dados que serão alterados
   * @param callback Função para tratar o retorno da alteração (erro ou acerto)
   */
  update (id, collectionData, callback) {
    Meteor.call(this.getCollectionName() + '.update', id, collectionData, (error) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, 'ok');
      }
    });
  }

  /**
   * Remove um doccumento da collection
   * Atenção: Esta função irá verificar se o usuário tem permissão para remover o documento da colletion
   * Confira a função checkIfCanUserRemove
   * @param id Do objeto que será removido
   * @param callback Função para tratar o retorno da remoção (erro ou acerto)
   */
  remove (id, callback) {
    Meteor.call(this.getCollectionName() + '.remove', id, (error) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, 'ok');
      }
    });
  }

  checkIfCanUserRemove (reactVar, id) {
    let idToCheck = id;
    if (typeof id === 'undefined' || id === null) {
      idToCheck = 'id_Fake_For_Permit_this_action';
    } else {
      idToCheck = id;
    }

    Meteor.call('user.can.' + this.getCollectionName() + '.remove', idToCheck, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        reactVar.set(result);
      }
    });
  }

  checkIfCanUserInsert (reactVar) {
    Meteor.call('user.can.' + this.getCollectionName() + '.insert', (error, result) => {
      if (error) {
        console.log(error);
      } else {
        reactVar.set(result);
      }
    });
  }

  checkIfCanUserUpdate (reactVar, id) {
    let idToCheck = id;
    if (typeof id === 'undefined' || id === null) {
      idToCheck = 'id_Fake_For_Permit_this_action';
    } else {
      idToCheck = id;
    }

    Meteor.call('user.can.' + this.getCollectionName() + '.update', idToCheck, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        reactVar.set(result);
      }
    });
  }

  checkIfCanUserView (reactVar, id) {
    let idToCheck = id;
    if (typeof id === 'undefined' || id === null) {
      idToCheck = 'id_Fake_For_Permit_this_action';
    } else {
      idToCheck = id;
    }

    Meteor.call('user.can.' + this.getCollectionName() + '.read', idToCheck, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        reactVar.set(result);
      }
    });
  }
}
;
