import { collectionCliente } from './collection';
import { controllerBase } from '../reuse/controllerBase';

class controllerCliente extends controllerBase {

}

export const clienteController = new controllerCliente(collectionCliente);

//É possível definir neste local as regras de dispobinilizaçao/publicação do conteúdo da collection
//Por exemplo, só exibe os clientes que torcem para o glorioso Atlético-MG: CtrlCliente.setFilter({time: 'Atlético-MG'}).



