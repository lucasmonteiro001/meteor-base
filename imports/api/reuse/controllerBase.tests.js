/**
 * <p>
 * Finalidade da Classe: Realizar testes unitáios
 * da classe controllerBase.
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
import { expect } from 'meteor/practicalmeteor:chai';
import { CollectionBase } from './collectionBase.js';
import { ControllerBase } from './controllerBase.js';

const CollectionTestes = new CollectionBase('CtrlTestes');
const CtrlCliente = new ControllerBase(CollectionTestes);

Meteor.methods({
  'test.resetDatabase': () => resetDatabase(),
});

var usuarioDeTeste = {
  nome: 'Jon Snow',
  endereco: 'Winterfell',
  telefone: 'none',
  Email: 'jon@snow.com',
  userId: '123456',
};

describe('Controller Base', function (done) {
  beforeEach(function (done) {
    Meteor.call('test.resetDatabase', done);
  });

  it('Deve retornar um filtro adicionado ao controller', function () {
    CtrlCliente.setFilter('Filtro de Teste');
    expect(CtrlCliente.getFilter()).to.be.equal('Filtro de Teste');
  });

  it('Deve retornar um objeto de schema default, vinculado ao de nome default', function () {
    expect(CtrlCliente.getProjection('default')).to.be.an('object');
  });

  it('Deve retornar o objeto collection vinculada ao controller', function () {
    expect(CtrlCliente.getAll()).to.be.an('object');
  });

  it('Deve retornar a collection vinculada ao controller', function () {
    expect(CtrlCliente.getCollection()).to.be.an('object');
  });

  it('Deve retornar o nome da collection vinculada ao controller', function () {
    expect(CtrlCliente.getCollectionName()).to.be.equal('CtrlTestes');
  });

  it('Deve retornar um objeto de schema vinculado ao controller', function () {
    expect(CtrlCliente.getSchema('default')).to.be.an('object');
  });

  it('Deve retornar um objeto json de schema vinculado ao controller', function () {
    expect(CtrlCliente.getSchemaJson('default')).to.be.an('object');
  });

  it('Deve retornar um documento da collection', function () {
    expect(CtrlCliente.get('123456')).to.be.undefined;
  });

});
