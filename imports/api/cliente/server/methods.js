import {Cliente} from "./../cliente.js"
import {methodsBase} from '../../util/methodsBase'

class methodsCliente extends methodsBase {

}

export const mCliente = new methodsCliente(Cliente);

//Para adicionar um novo método ou sobrescreer um método existente utilize:
//mCliente.addMethod(NomeDoMetodo,Funcao);

mCliente.applyAllMethods();