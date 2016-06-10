import {clienteModel} from './model'
import {controllerClientBase} from '../util/controllerClientBase'

class controllerClientCliente extends controllerClientBase {

}

export const clienteCtrlClient = new controllerClientCliente(clienteModel);

//É possível definir neste local as regras de dispobinilizaçao/publicação do conteúdo da collection
//Por exemplo, só exibe os clientes que torcem para o glorioso Atlético-MG: CtrlCliente.setFilter({time: 'Atlético-MG'}).



