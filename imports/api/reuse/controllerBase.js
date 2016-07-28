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
import { Mongo } from 'meteor/mongo';

export class ControllerBase {
  /**
   * Cria um controller, para a coleção desejada.
   * @param collectionBase - Coleção que será
   * instanciada pelo controller.
   */
  constructor (collectionBase) {
    this.collectionInstance = collectionBase.getCollection();
    this.collectionInstanceBase = collectionBase;
    this.filter = {};
    this.collectionPermissions = {};
    Meteor.call('get.' + this.getCollectionName() + '.permissions', (error, result) => {
      if (error) {
        console.log('Erro ao obter permissoes:' + error);
      } else {
        this.collectionPermissions = result;
      }
    });
  }

  /**
   * Define regras de disponibilzação/publicação
   * do conteúdo da collection
   * @param filter - Filtro para as reegras de publicação
   */
  setFilter (filter) {
    this.filter = filter;
  }

  /**
   * Retorna o filtro de regras de disponibilização/publicação
   * do conteúdo da collection
   * @returns {*} - Filtro definido na collection
   */
  getFilter () {
    return this.filter
  }

  /**
   * Retorna os campos de uma collection que serão exibidos
   * @param schemaName - Nome do schema que será aplicado
   * as regras de projection
   * @returns {{_id: number}} - Retorna estado dos campos
   * 0 não será exibido e 1 será exibido
   */
  getProjection (schemaName) {
    let fields = [];
    if (this.collectionInstanceBase.getSubSchema(schemaName) != undefined) {
      fields = this.collectionInstanceBase.getSubSchema(schemaName);
    } else {
      for (let key in this.collectionInstanceBase.getSchemaJson()) {
        fields.push(key);
      }
    }

    let projection = { _id: 1 };
    fields.forEach(function (field) {
      projection[field] = 1;
    });

    return projection;

  }

  /**
   * Retorna todos os documentos de uma colletion
   * @returns - Documentos de da collection
   */
  getAll () {
    const resultado = this.collectionInstance.find();
    if (resultado)
      return resultado;
  }

  /**
   * Retorna uma collection
   * @returns {*} - Collection instanciada pelo controller
   */
  getCollection () {
    return this.collectionInstance;
  }

  /**
   * Retorna o nome da collection
   * @returns {*} - Nome da collection vinculada ao controller
   */
  getCollectionName () {
    return this.collectionInstance._name;
  }

  /**
   * Retorna o nome do schema
   * @param schemaName - Nome do schema
   * @returns {*|SimpleSchema} - Schema passado por
   * parâmetro ou schema default,
   * caso nenhum esquema seja atribuído.
   */
  getSchema (schemaName = 'default') {
    return this.collectionInstanceBase.getSchema(schemaName);
  }

  /**
   * Retorna o schema em formato json
   * @param schemaName - Nome do schema
   * @returns {*} - Schema em Json ou o schema deafault
   */
  getSchemaJson (schemaName = 'default') {
    return this.collectionInstanceBase.getSchemaJson(schemaName);
  }

  /**
   * Retorna o schema em formato json
   * @param subSchemaName - Nome do Sub Schema
   * @returns {*} - Schema em Json ou o schema deafault
   */
  getSubSchemaJson (subSchemaName = 'default') {
    return this.collectionInstanceBase.getSubSchemaJson(subSchemaName);
  }

  /**
   * Retorna o schema em formato json
   * @param fieldName - Nome do Campos
   * @returns {*} - Schema em Json ou o schema deafault
   */
  getFieldSchemaJson (fieldName) {
    if (fieldName)
      return this.collectionInstanceBase.getFieldSchemaJson(fieldName);
    else
      return {};
  }

  /**.
   * Retorna um documento da collection
   * @param searchFor - Id do documento
   * @returns {any|*} - Documento da collection
   */
  get (searchFor) {
    return this.collectionInstance.findOne(searchFor);
  }

  /**
   * Insere um documento na collection
   * @param collectionData - Dados que serão inseridos
   * @param callback - Função de callack para tratar o retorno da função
   */
  insert (collectionData, callback) {
    Meteor.call
    (this.getCollectionName() + '.insert', collectionData, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);

      }
    });
  }

  /**
   * Atualiza um documento na collection
   * @param id - Id do documento que será atualizado
   * @param collectionData - Dados que serão atualizados
   * @param callback - Função de callack para tratar o retorno da função
   */
  update (id, collectionData, callback) {
    Meteor.call(
        this.getCollectionName() + '.update', id, collectionData, (error, result) => {
          if (error) {
            callback(error, null);
          } else {
            callback(null, result);
          }
        });
  }

  /**
   * Remove um documento na collection
   * @param id - Id do documento que será removido
   * @param callback - Função de callack para tratar o retorno da função
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

  /**
   * Verifica se o usuario logado temp permissao para executa a açaõ informada.
   * @param action realizado pelo usuário
   * @param id do objeto que esetá sendo referenciado na açao
   * @returns {*}
   */
  canUserDo (action, id) {
    let permissions = this.collectionPermissions;
    let userId = Meteor.userId();
    let result = false;
    if (permissions.length > 0) {
      for (let keyPerm in permissions) {
        if (typeof permissions[keyPerm].groups != 'undefined') {

          if (Roles.userIsInRole(userId, permissions[keyPerm].groups)
              && (permissions[keyPerm].actions.indexOf(action) > -1)) {
            result = true;
          }

        }

        //Verifica somente o acesso, o filtro de dados é feito no Model
        if ((result || typeof permissions[keyPerm].groups == 'undefined')
            && ((typeof permissions[keyPerm].data != 'undefined') && (typeof id != 'undefined'))) {

          //Não basta ter permissão de functionalidade, tem que ter por dados também caso ela seja definida
          result = false;

          let doc = this.get(id);

          if (typeof doc != 'undefined') {

            //Substitui as tags {_UserID_} pelo ID do usuário no Objeto
            let dataTmp = JSON.stringify(permissions[keyPerm].data);
            permissions[keyPerm].data = JSON.parse(dataTmp.replace(new RegExp('{_UserID_}', 'g'), userId));

            for (let field in permissions[keyPerm].data) {
              if (permissions[keyPerm].data[field] == doc[field]) {
                result = true;
              }

            }

          } else {
            console.warn('Falha na verificação de segurança: No Subscribe');
            //Caso o subscribe não tenha efetivado não dá acesso à tela.
            result = false;
          }

        }

        if (result) {
          return true;
        }
      }

      //Se nenhuma permissão é atendida o resultado é sempre falso.
      return false;

    } else {
      //Se não existir permissões por funcionalidade (groups) ou data o acesso é sempre permitido.
      return true;
    }

  }

}
;
