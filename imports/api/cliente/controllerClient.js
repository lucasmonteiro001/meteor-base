import {model} from './model'
import {controllerClientBase} from '../reuse/controllerClientBase'

class controllerClientCliente extends controllerClientBase {

}

export const clienteCtrlClient = new controllerClientCliente(model);

//É possível definir neste local as regras de dispobinilizaçao/publicação do conteúdo da collection
//Por exemplo, só exibe os clientes que torcem para o glorioso Atlético-MG: CtrlCliente.setFilter({time: 'Atlético-MG'}).



