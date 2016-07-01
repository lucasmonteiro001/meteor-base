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
import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { expect } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { Random } from 'meteor/random';
import { CollectionBase } from './collectionBase.js';
import { ControllerBase } from './controllerBase.js';
import { ModelBase } from './modelBase.js';

const CltBase = new CollectionBase('CtrlTestes');

CltBase.setSchema({
  nome: {
    type: String,
    defaultValue: '',
  },
  userId: {
    type: String,
  },
});

CltBase.addSubSchema('insert', ['nome', 'userId']);

const MdlBase = new ModelBase(CltBase);

let groups = ['administrador'];

MdlBase.setGroupPermissions(['insert', 'update', 'delete', 'read'], groups);

MdlBase.applyAllMethods();

const CtrlBase = new ControllerBase(CltBase);

let idUsuario = '';

Meteor.methods({
  'test.resetDatabase': () => resetDatabase(),
});

if (Meteor.isServer) {
  describe('Controller Base', () => {

    beforeEach((done) => {

      Meteor.call('test.resetDatabase', done);

      const usuarioId = Random.id();

      idUsuario = usuarioId;

      let usuarioDeTeste = {
        nome: 'Arya Stark',
        userId: this.userId,
      };

      CtrlBase.insert(usuarioDeTeste, (error, result) => {
        if (error) {
          console.log('ERRO ' + error);
        } else {
          console.log('Resposta ' + result._id);
        }
      });
    });

    // it('Deve retornar um filtro adicionado ao controller', function () {
    //   CtrlBase.setFilter('Filtro de Teste');
    //   expect(CtrlBase.getFilter()).to.be.equal('Filtro de Teste');
    // });
    //
    // it('Deve retornar um objeto de schema default, vinculado ao de nome default', function () {
    //   expect(CtrlBase.getProjection('default')).to.be.an('object');
    // });
    //
    // it('Deve retornar o objeto collection vinculada ao controller', function () {
    //   expect(CtrlBase.getAll()).to.be.an('object');
    // });
    //
    // it('Deve retornar a collection vinculada ao controller', function () {
    //   expect(CtrlBase.getCollection()).to.be.an('object');
    // });
    //
    // it('Deve retornar o nome da collection vinculada ao controller', function () {
    //   expect(CtrlBase.getCollectionName()).to.be.equal('CtrlTestes');
    // });
    //
    // it('Deve retornar um objeto de schema vinculado ao controller', function () {
    //   expect(CtrlBase.getSchema('default')).to.be.an('object');
    // });
    //
    // it('Deve retornar um objeto json de schema vinculado ao controller', function () {
    //   expect(CtrlBase.getSchemaJson('default')).to.be.an('object');
    // });
    //
    // it('Deve retornar um documento da collection', function () {
    //   expect(CtrlBase.get('123456')).to.be.undefined;
    // });

    it('Deve inserir um usuário na collection', function () {
      const invocation = { userId: usuarioId };

      console.log('ENTRO NO TESTE');
      console.log('Usuario Cadastrado ' + CtrlBase.get(idUsuario));
      expect(CtrlBase.get('123456')).to.be.undefined;
    });

  });
}
;

