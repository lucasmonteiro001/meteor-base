/**
 * <p>
 * Finalidade da Classe: Realizar testes unitáios
 * da classe collectionBase
 * </p>
 *
 * <p>
 * Copyright: Copyright (c) Synergia - DCC - UFMG
 * </p>
 *
 * @author mfpinheiro
 * @author Última modificação realizada por : mfpinheiro $.
 * @version :: 22/06/2016#$.
 *
 */
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { chai } from 'meteor/practicalmeteor:chai';
import { CollectionBase } from './collectionBase.js';
import { ModelBase } from './modelBase.js';
import { expect } from 'meteor/practicalmeteor:chai';

const CltBase = new CollectionBase('CtlTestes');

CltBase.setSchema({
  nome: {
    type: String,
    defaultValue: '',
  },
  cpf: {
    type: String,
    defaultValue: '',
  },
  telefone: {
    type: String,
    defaultValue: '',
  },
  endereco: {
    type: String,
    defaultValue: '',
  },
});

CltBase.addSubSchema('insert', ['nome', 'cpf', 'telefone', 'endereco']);

CltBase.addSubSchema('update', ['nome', 'telefone', 'endereco']);

CltBase.addSubSchema('remove', ['nome', 'cpf', 'telefone', 'endereco']);

describe('Collection Base', (done) => {
  beforeEach((done) => {
    Meteor.call('test.resetDatabase', done);
  });

  it('Deve retornar a diferença entre o Schema e o SubSchema', () => {
    let schema = JSON.stringify(CltBase.getSchema());
    let subSchema = JSON.stringify(CltBase.getSubSchema('insert'));

    expect(schema).to.not.equal(subSchema);
  });

  it('Deve retornar um SubSchemaJSOn vinculado a collection', () => {
    let subSchemaJson = {
      nome: {
        type: String,
        defaultValue: '',
      },
      cpf: {
        type: String,
        defaultValue: '',
      },
      telefone: {
        type: String,
        defaultValue: '',
      },
      endereco: {
        type: String,
        defaultValue: '',
      },
    };
    let subSchemaVinculado = JSON.stringify(CltBase.getSubSchemaJson('insert'));
    subSchemaJson = JSON.stringify(subSchemaJson);
    expect(subSchemaVinculado).to.equal(subSchemaJson);
  });

  it('Deve retornar um SubSchema vinculado a collection', () => {
    let subSchema = ['nome', 'telefone', 'endereco'];
    subSchemaVinculado = JSON.stringify(CltBase.getSubSchema('update'));
    subSchema = JSON.stringify(subSchema);
    expect(subSchemaVinculado).to.equal(subSchema);
  });

  it('Deve retornar SchemaJson vinculado a collection', () => {
    let schemaJson = {
      nome: {
        type: String,
        defaultValue: '',
      },
      cpf: {
        type: String,
        defaultValue: '',
      },
      telefone: {
        type: String,
        defaultValue: '',
      },
      endereco: {
        type: String,
        defaultValue: '',
      },
    };
    let schemaJsonVinculado = JSON.stringify(CltBase.getSchemaJson('remove'));
    schemaJson = JSON.stringify(schemaJson);
    expect(schemaJsonVinculado).to.equal(schemaJson);
  });

  it('Deve retornar a collection CtlTestes que está vinculada', () => {
    let collection = CltBase.getCollection();
    expect(collection._name).to.equal('CtlTestes');
  });

});
