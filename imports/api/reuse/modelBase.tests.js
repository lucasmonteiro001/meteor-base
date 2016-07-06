/**
 * <p>
 * Finalidade da Classe: Realizar testes unitáios
 * da classe modelBalse
 * </p>
 *
 * <p>
 * Copyright: Copyright (c) Synergia - DCC - UFMG
 * </p>
 *
 * @author mfpinheiro
 * @author Última modificação realizada por : mfpinheiro $.
 * @version :: 30/06/2016#$.
 *
 */
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { chai } from 'meteor/practicalmeteor:chai';
import { ModelBase } from './modelBase.js';
import { CollectionBase } from './collectionBase.js';

const CollectionTestes = new CollectionBase('MdlTestes');

const MdlBase = new ModelBase(CollectionTestes);

describe('Model Base', function (done) {
  beforeEach(function (done) {
    Meteor.call('test.resetDatabase', done);
  });

});
