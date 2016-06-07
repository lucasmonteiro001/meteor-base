import {resetDatabase} from 'meteor/xolvio:cleaner';
import {controllerBase} from './controllerBase';
import {Cliente} from '../cliente/cliente'

const CtrlCliente = new controllerBase(Cliente);


// NOTE: Before writing a method like this you'll want to double check
// that this file is only going to be loaded in test mode!!
Meteor.methods({
    'test.resetDatabase': () => resetDatabase(),
});



const templateFaker = function() {

    this.collection = '';
    this.filter = '';
    this.projection = '';
    this.subscribe = function(collection,filter,projection){
        this.collection = collection;
        this.filter = filter;
        this.projection = projection;
    }
};

describe('controllerBase', function (done) {
    beforeEach(function (done) {
        // We need to wait until the method call is done before moving on, so we
        // use Mocha's async mechanism (calling a done callback)
        Meteor.call('test.resetDatabase', done);
    });

    it('Verificar a correta definição do filtro do subscribe', function () {

        template = new templateFaker();
        //spies.create('template', template, 'subscribe');
        //const Ctrl = new controllerBase("");
        CtrlCliente.setFilter({time: 'Atlético-MG'});
        CtrlCliente.applySubscribe(template, 'IDXXXXXXX', 'View');
        chai.assert.equal(template.filter, CtrlCliente.getAll());

        console.log(template.filter);
        console.log({time: 'Atlético-MG',_id:'IDXXXXXXX'});
        // Later on in your test or test suite tear down
        //spies.restoreAll();

    });
});