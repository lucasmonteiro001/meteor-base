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

describe('Validar métodos Get e Set do controller base', function (done) {
  beforeEach(function (done) {
    Meteor.call('test.resetDatabase', done);
  });

  it('setFilter() deve inserir um filtro e getFilter(), deve retornar o filtro inserido', function () {
    clienteController.setFilter('Filtro de Teste');
    chai.assert.equal('Filtro de Teste', clienteController.getFilter());
  });

});


