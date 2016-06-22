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
import { ModelBase } from './modelBase.js';

const clienteModel = new ModelBase(collectionCliente);

// describe('Verificar os métodos da classe Collection Base', function (done) {
//   beforeEach(function (done) {
//     Meteor.call('test.resetDatabase', done);
//   });
//
//   it('Dois inteiros são iguais', function () {
//     chai.assert.equal(3, 3);
//   });
//
// });
