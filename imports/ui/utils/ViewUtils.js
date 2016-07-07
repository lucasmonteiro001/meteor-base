import { Blaze } from 'meteor/blaze';
import { Template } from 'meteor/templating';
import { Utils } from '../../api/reuse/utils';

class ViewUtils {
  constructor () {
    this.templatesRendereds = {};
  }

  /**
   * Aplica um subsbcribe para o modelo
   * @param schemaName - Nome do schema do modelo
   * @param template - template para o subscribe
   * @param searchFor - Filtro por id
   * @param callback - Função de callack para tratar o retorno da função
   */
  applySubscribe (controller, schemaName, template, searchFor = '', callback) {
    let newFilter;

    if (searchFor != '' && typeof searchFor == 'string') {
      newFilter = Utils.mergeObj(controller.getFilter(), { '_id': searchFor });
    } else if (searchFor != '' && typeof searchFor == 'object') {
      newFilter = Utils.mergeObj(controller.getFilter(), searchFor);
    } else {
      newFilter = controller.getFilter();
    }

    let handle = template
        .subscribe(controller.getCollectionName(),
            newFilter, controller.getProjection(schemaName));

    template.autorun(() => {
      const isReady = handle.ready();
      if (isReady) {
        callback();
      }
    });

  }

  /**
   * Renderiza templates na página
   * @param templateName Nome do template.
   * @param idOfDomNode Id do Elemento aonde o template será renderizado
   * @param data Dados que serão passados para o template
   */
  templateRender (templateName, idOfDomNode, data = {}) {
    let domNode = document.getElementById(idOfDomNode);

    if (this.templatesRendereds[templateName] && Blaze.getData(this.templatesRendereds[templateName])) {
      Blaze.remove(this.templatesRendereds[templateName]);
    }

    this.templatesRendereds[templateName] = Blaze.renderWithData(Template[templateName], data, domNode);

  }

  showModalWithTemplate (templateName, data = {}, titleModal = 'Informações', config = {
    animacao: 'flipInY',
    classTamanho: '500px'
  }) {

    // Your existing code unmodified...
    let modalDiv = document.createElement('div');
    modalDiv.id = 'openTemplateModal';
    modalDiv.className = 'modalDialog col-xs-12';
    document.getElementsByTagName('body')[0].appendChild(modalDiv);

    let modalContent = document.createElement('div');
    modalContent.className = 'modal-content animated ' + config.animacao;

    if (config.classTamanho) {
      modalContent.style = 'min-width:90px; width: ' + config.classTamanho;
    }

    modalDiv.appendChild(modalContent);

    let modalHeader = document.createElement('div');
    modalHeader.className = 'modalHead';

    let titleTag = document.createElement('h2');
    titleTag.className = 'modal-title';
    titleTag.innerHTML = titleModal;
    modalHeader.appendChild(titleTag);

    modalContent.appendChild(modalHeader);

    let modalBody = document.createElement('div');
    modalBody.id = 'modalBody';
    modalBody.className = 'modal-body';
    modalContent.appendChild(modalBody);

    let modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';

    let buttonClose = document.createElement('button');
    buttonClose.className = 'btn btn-white';
    buttonClose.onclick = function () {
      window.location.hash = '#';
      //Blaze.remove(this.templatesRendereds[templateName]);
      document.getElementsByTagName('body')[0].removeChild(modalDiv);
    };
    buttonClose.innerHTML = 'Fechar'
    modalFooter.appendChild(buttonClose);

    modalContent.appendChild(modalFooter);

    if (this.templatesRendereds[templateName] && Blaze.getData(this.templatesRendereds[templateName])) {
      Blaze.remove(this.templatesRendereds[templateName]);
    }

    this.templatesRendereds[templateName] = Blaze.renderWithData(Template[templateName], data, modalBody);

    window.location.hash = '#openTemplateModal';

    console.log('showModalWithTemplate:OK');
  }

}

export const UtilsView = new ViewUtils();
