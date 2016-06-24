import { CollectionClientes } from './collection';
import { ControllerBase } from '../reuse/controllerBase';

class ControllerClientes extends ControllerBase {

}

export const CtrlClientes = new ControllerClientes(CollectionClientes);

// É possível definir neste local as regras de dispobinilizaçao/publicação do conteúdo da collection
// Por exemplo, só exibe os clientes que torcem para o glorioso Atlético-MG:
// CtrlCliente.setFilter({time: 'Atlético-MG'})

