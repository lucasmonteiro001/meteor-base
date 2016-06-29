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
import { expect } from 'meteor/practicalmeteor:chai';
import { CollectionClientes } from '../cliente/collection.js';
import { ControllerBase } from './controllerBase.js';

const CtrlCliente = new ControllerBase(CollectionClientes);

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
    expect(CtrlCliente.getFilter()).to.have.string('Filtro de Teste');
    expect(CtrlCliente.getFilter()).to.be.equal('Filtro de Teste');
    chai.assert.equal('Filtro de Teste', CtrlCliente.getFilter());
  });

  it('Deve retornar a collection vinculada ao controller', function () {
    expect(CtrlCliente.getCollectionName()).to.be.equal('Clientes');
  });

});
