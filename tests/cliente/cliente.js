import { CtrlCliente } from './cliente.coffee';
import { describe, it, before, after, beforeEach, afterEach, xdescribe, xit, specify, xspecify, context, xcontext } from 'meteor/practicalmeteor:mocha';
import { expect } from 'meteor/practicalmeteor:chai';

describe('1 - Array', function () {
  describe('1.1 - #indexOf()', function () {
    return it('should return -1 when the value is not present', function () {
      expect([1, 2, 3].indexOf(5)).to.equal(-1);
      return expect([1, 2, 3].indexOf(0)).to.equal(-1);
    });
  });
});
describe('Cat Stuff', () => {
  it('draws a laser pointer\'s position as a number', () => {
    let laser = CtrlCliente.getCollection();
    assert.typeOf(laser.position, 'Mongo.Collection');
  });
});