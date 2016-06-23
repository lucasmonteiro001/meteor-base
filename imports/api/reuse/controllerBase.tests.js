/**
 * <p>
 * Finalidade da Classe: Finalidade da classe.
 * item de processo em autorização de fornecimento.
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
import { collectionCliente } from '../cliente/collection.js';
import { ControllerBase } from './controllerBase.js';

var expect = require(chai).expect;

const clienteController = new ControllerBase(collectionCliente);

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
    clienteController.setFilter({ filtroTeste: 'Filtro de Teste' });
    expect(clienteController.getFilter()).to.be.a(String);
    expect(clienteController.getFilter()).to.be.equal('Filtro de Teste');
    chai.assert.equal('Filtro de Teste', clienteController.getFilter());
  });

  //
  it('Deve retornar a collection vinculada ao controller', function () {
    expect(clienteController.getCollection()).to.be.a(Collection);
    expect(clienteController.getCollectionName()).to.be.equal('cliente');
  });


});


