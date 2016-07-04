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

CltBase.addSubSchema('update', ['nome', 'userId']);

CltBase.addSubSchema('remove', ['nome', 'userId']);

const MdlBase = new ModelBase(CltBase, true);

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

    before((done) => {
      Meteor.call('test.resetDatabase', done);
    });

    it('Deve retornar um filtro adicionado ao controller', () => {
      CtrlBase.setFilter('Filtro de Teste');
      expect(CtrlBase.getFilter()).to.be.equal('Filtro de Teste');
    });

    it('Deve retornar um objeto de schema default, vinculado ao de nome default', () => {
      expect(CtrlBase.getProjection('default')).to.be.an('object');
    });

    it('Deve retornar o objeto collection vinculada ao controller', () => {
      expect(CtrlBase.getAll()).to.be.an('object');
    });

    it('Deve retornar a collection vinculada ao controller', () => {
      expect(CtrlBase.getCollection()).to.be.an('object');
    });

    it('Deve retornar o nome da collection vinculada ao controller', () => {
      expect(CtrlBase.getCollectionName()).to.be.equal('CtrlTestes');
    });

    it('Deve retornar um objeto de schema vinculado ao controller', () => {
      expect(CtrlBase.getSchema('default')).to.be.an('object');
    });

    it('Deve retornar um objeto json de schema vinculado ao controller', () => {
      expect(CtrlBase.getSchemaJson('default')).to.be.an('object');
    });

    it('Deve retornar um documento da collection', () => {
      expect(CtrlBase.get('123456')).to.be.undefined;
    });

    it('Deve inserir o usuário na collection', (done) => {

      let usuarioDeTeste = {
        nome: 'Arya Stark',
        userId: '123456',
      };

      CtrlBase.insert(usuarioDeTeste, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
          idUsuario = result;
        }
      });

      let usuario = CtrlBase.get(idUsuario);

      expect(usuario.nome).to.be.equal('Arya Stark');
      expect(usuario).to.be.an('object');
      done();
    });

    it('Deve alterar os dados de um usuário na collection', (done) => {

      const nome = 'Arya of Winterfell';

      CtrlBase.update(idUsuario, { "nome": nome }, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log(result);

        }
      });

      let usuario = CtrlBase.get(idUsuario);

      expect(usuario.nome).to.be.equal('Arya of Winterfell');
      done();
    });

    it('Deve remover um usuário da collection', (done) => {

      CtrlBase.remove(idUsuario, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
        }
      });

      expect(CtrlBase.get(idUsuario)).to.be.undefined;
      done();
    });
  });

}
;

