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

const CtlClientes = new CollectionBase('CtlTestes');

describe('Collection Base', function (done) {
  beforeEach(function (done) {
    Meteor.call('test.resetDatabase', done);
  });

  it('Deve retornar um objeto de schema vinculado a collection', function () {
    expect(CtlClientes.getSchema('default')).to.be.an('object');
  });

  it('Deve retornar um objeto de sub schema json vinculado a collection', function () {
    expect(CtlClientes.getSubSchemaJson('default')).to.be.an('object');
  });

  it('Deve retornar undefined ao retornar um subSchema vinculado a collection', function () {
    expect(CtlClientes.getSubSchema('default')).to.be.undefined;
  });

  it('Deve retornar um objeto json de schema vinculado a collection', function () {
    expect(CtlClientes.getSchemaJson('default')).to.be.an('object');
  });

  it('Deve retornar a collection vinculada a collection', function () {
    expect(CtlClientes.getCollection()).to.be.an('object');
  });

});
