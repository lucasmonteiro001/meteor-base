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

const CtlBase = new CollectionBase('CtlTestes');

describe('Collection Base', function (done) {
  beforeEach(function (done) {
    Meteor.call('test.resetDatabase', done);
  });

  it('Deve retornar um objeto de schema vinculado a collection', function () {
    expect(CtlBase.getSchema('default')).to.be.an('object');
  });

  it('Deve retornar um objeto de sub schema json vinculado a collection', function () {
    expect(CtlBase.getSubSchemaJson('default')).to.be.an('object');
  });

  it('Deve retornar undefined ao retornar um subSchema vinculado a collection', function () {
    expect(CtlBase.getSubSchema('default')).to.be.undefined;
  });

  it('Deve retornar um objeto json de schema vinculado a collection', function () {
    expect(CtlBase.getSchemaJson('default')).to.be.an('object');
  });

  it('Deve retornar a collection vinculada a collection', function () {
    expect(CtlBase.getCollection()).to.be.an('object');
  });

});
