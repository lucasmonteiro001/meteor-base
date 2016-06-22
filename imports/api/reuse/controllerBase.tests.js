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

console.log('Entrou 1');

var usuarioDeTeste = {
  nome: 'Jon Snow',
  endereco: 'Winterfell',
  telefone: 'none',
  Email: 'jon@snow.com',
  userId: '123456',
};

console.log('Entrou 2');

describe('Validar métodos Get e Set do controller base', function (done) {

  beforeEach(function (done) {
    console.log('Entrou 3');
    Meteor.call('test.resetDatabase', done);
  });

  console.log('Entrou 4');

  it(' setFilter () deve inserir um filtro', function () {

    console.log('Entrou 5');

    chai.assert.equal('Filtro de Teste', clienteController.getFilter());
  });

});


