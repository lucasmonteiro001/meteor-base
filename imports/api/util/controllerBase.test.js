import {resetDatabase} from 'meteor/xolvio:cleaner';
import {controllerBase} from './controllerBase';
import {Cliente} from '../cliente/cliente'
import '../cliente/server/methods'



if( Meteor.isServer)
{

// NOTE: Before writing a method like this you'll want to double check
// that this file is only going to be loaded in test mode!!
    Meteor.methods({
        'test.resetDatabase': () => resetDatabase(),
    });

    var clienteTeste = {
        nome: 'Jon Snow',
        endereco: 'Winterfell',
        telefone: 'none',
        Email: 'jon@snow.com',
        userId: '123456'
    }
}


if( Meteor.isClient)
{
    const CtrlCliente = new controllerBase(Cliente);
    const templateFaker = function () {

        this.collection = '';
        this.filter = '';
        this.projection = '';
        this.subscribe = function (collection, filter, projection) {
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

            CtrlCliente.insert(clienteTeste, (error, result) => {
                if (error)
                    console.log(error);
                return console.log(CtrlCliente.get(result));
            });

            chai.assert.equal(Cliente, CtrlCliente.getCollection());

            // CtrlCliente.setFilter({nome: 'John Smith'});
            // CtrlCliente.applySubscribe(template, '123456', 'View');
            // CtrlCliente.getCollection()
            // console.log(CtrlCliente.get('123456'));
            // console.log(CtrlCliente.getCollection());
            // console.log(CtrlCliente.getCollectionName());
            // console.log(CtrlCliente.getAll());
            // console.log(template.filter);
            // console.log({nome: 'John Smith', _id:'123456'});

        });
    });


}