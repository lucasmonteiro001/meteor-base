/**
 * <p>
 * Finalidade da Classe: Realizar testes unitáios
 * da classe collection do objeto colaborador.
 * </p>
 *
 * <p>
 * Copyright: Copyright (c) Synergia - DCC - UFMG
 * </p>
 *
 * @author mfpinheiro
 * @author Última modificação realizada por : mfpinheiro $.
 * @version :: 12/07/2016#$.
 *
 */
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { expect } from 'meteor/practicalmeteor:chai';
import { CollectionColaboradores } from './collection.js';

describe('Collection Colaboradores', (done) => {
  beforeEach((done) => {
    Meteor.call('test.resetDatabase', done);
  });

  it('Deve retornar a diferença entre o Schema e o SubSchema', () => {
    let schema = JSON.stringify(CollectionColaboradores.getSchema());
    let subSchema = JSON.stringify(CollectionColaboradores.getSubSchema('insert'));

    expect(schema).to.not.equal(subSchema);
  });

  it('Deve retornar um SubSchemaJSON vinculado a Collection Colaboradores', () => {
    let subSchemaVinculado = JSON.stringify(CollectionColaboradores.getSubSchemaJson('insert'));
    expect(subSchemaVinculado).to.equal
    (JSON.stringify(CollectionColaboradores.getSubSchemaJson('insert')));
  });

  it('Deve retornar um SubSchema vinculado a Collection Colaboradores', () => {
    let subSchema = ['nome', 'diasTrabalhados', 'inputDisabled',
      'dataNascimento', 'cpf', 'login', 'setor', 'funcao',
      'dataEntrada', 'telefone', 'celular', 'email',
      'quantidadeDeDependentes', 'helptext', 'horaEntrada',
      'horaSaida', 'userId'];
    subSchemaVinculado = JSON.stringify(CollectionColaboradores.getSubSchema('update'));
    subSchema = JSON.stringify(subSchema);
    expect(subSchemaVinculado).to.equal(subSchema);
  });

  it('Deve retornar SchemaJson vinculado a collection', () => {
    let schemaJsonVinculado = JSON.stringify(CollectionColaboradores.getSchemaJson('view'));
    expect(schemaJsonVinculado).to.equal
    (JSON.stringify(CollectionColaboradores.getSchemaJson('view')));
  });

  it('Deve retornar a collection Colaboradores que está vinculada', () => {
    let collection = CollectionColaboradores.getCollection();
    expect(collection._name).to.equal('Colaboradores');
  });

});
