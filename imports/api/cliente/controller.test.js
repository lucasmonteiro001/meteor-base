/**
 * <p>
 * Finalidade da Classe: Testar os métodos
 * do controller vinculao a collection
 * Cliente.
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
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { chai } from 'meteor/practicalmeteor:chai';
import { Cliente } from './collection.js';
import { Controller } from './controller.js';

// NOTE: Before writing a method like this you'll want to double check
// that this file is only going to be loaded in test mode!!
const clienteController = new Controller(Cliente);

Meteor.methods({
  'test.resetDatabase': () => resetDatabase(),
});

// OBJETO QUE SERÁ INSERIDO NO TESTE
var clienteTeste = {
  nome: 'Jon Snow',
  endereco: 'Winterfell',
  telefone: 'none',
  Email: 'jon@snow.com',
  userId: '123456',
};

describe('TESTAR OS MÉTODOS DE CRUD DA COLLECTION CLIENTE', function (done) {

  //MÉTODOS EXECUTADOS ANTES DOS TESTES, PARA PREPAÇÃO DO AMBIENTE
  //NESTE CASO LIMPA-SE O BANCO DE TESTE, ANTES DAS EXECUÇÕES.
  beforeEach(function (done) {
    // We need to wait until the method call is done before moving on, so we
    // use Mocha's async mechanism (calling a done callback)
    Meteor.call('test.resetDatabase', done);
  });

  it('VERIFICAR SE O OBJETO É INSERIDO NA COLLETCION', function () {

    //MÉTODO CHAMADO PARA INSERÇÃO DO CLIENTE, CONFORME DEFINIDO NA CLASSE "METHODS" DA
    //COLLECTION
    //Deve falhar, pois existe uma restrição de permissão.
    clienteController.insert(clienteTeste, (error, result) => {
      if (error)
        console.log(error);
      return console.log(result);
    });

    chai.assert.equal(Cliente, clienteController.getCollection());

  });
});


