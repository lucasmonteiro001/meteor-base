import {collectionCliente} from './collection';
import {ControllerBase} from '../reuse/controllerBase';

class ControllerCliente extends ControllerBase {

}

export const clienteController = new ControllerCliente(collectionCliente);

//É possível definir neste local as regras de dispobinilizaçao/publicação do conteúdo da collection
//Por exemplo, só exibe os clientes que torcem para o glorioso Atlético-MG:
// CtrlCliente.setFilter({time: 'Atlético-MG'})
