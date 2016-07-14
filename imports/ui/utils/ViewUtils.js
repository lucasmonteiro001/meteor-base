import {Blaze} from "meteor/blaze";
import {Template} from "meteor/templating";
import {Utils} from "../../api/reuse/utils";

class ViewUtils {
    constructor() {
        this.templatesRendereds = {};
    }

    /**
     * Aplica um subsbcribe para o modelo
     * @param controllerVar - Controller ou nome da Collection
     * @param schemaName - Nome do schema do modelo
     * @param template - template para o subscribe
     * @param searchFor - Filtro por id
     * @param callback - Função de callack para tratar o retorno da função
     */
    applySubscribe(controllerVar, schemaName, template, searchFor = '', callback) {
        let newFilter;
        let controller;
        if (typeof controllerVar == 'string') {
            controller = Blaze._globalHelpers.getController(controllerVar);
        } else {
            controller = controllerVar;
        }

        if (searchFor != '' && typeof searchFor == 'string') {
            newFilter = Utils.mergeObj(controller.getFilter(), {'_id': searchFor});
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
    templateRender(templateName, idOfDomNode, data = {}) {
        let domNode = document.getElementById(idOfDomNode);

        if (this.templatesRendereds[templateName] && Blaze.getData(this.templatesRendereds[templateName])) {
            Blaze.remove(this.templatesRendereds[templateName]);
        }

        this.templatesRendereds[templateName] = Blaze.renderWithData(Template[templateName], data, domNode);

    }

    /**
     * Exibe uma tela modal a partir dos parâmetros
     * @param templateName Nome do template
     * @param data Dados que serão utilizados pelo template
     * @param titleModal Titulo da Tela modal
     * @param config Configuracoes extras referentes à animação, tamanho, etc
     */
    showModalWithTemplate(templateName, data = {}, titleModal = 'Informações', config = {
        animation: 'flipInY',
        screenSize: '500px'
    }) {

        //region Your existing code unmodified...
        let modalDiv = document.createElement('div');
        modalDiv.id = 'openTemplateModal';
        modalDiv.className = 'modalDialog col-xs-12';
        document.getElementsByTagName('body')[0].appendChild(modalDiv);

        let modalContent = document.createElement('div');
        modalContent.className = 'modal-content animated ' + config.animation;

        if (config.screenSize) {
            modalContent.style = 'min-width:90px; width: ' + config.screenSize;
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
        modalBody.className = 'modal-body fixedSWidthDiv';
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

        //endregion
    }

    /**
     * Retorna as configurações para o componente DataTable a partir do controler do schema selecionado
     * @param controller Controler referente aos dados que serão utilizados
     * @param schemaName Nome do Schema utilizado na renderização das informações da tabela
     */
    getDataTableConfig(conrollerVar, schemaName, otherConfigurations = {}) {

        let tableRenderFunction = this.getTableViewFromSchemaAndListOfObjects;
        let listRenderFunction = this.getListViewFromSchemaAndListOfObjects;
        let optionsObject = {
            columns: [],
            "initComplete": function (settings, json) {
                setTimeout(function () {
                    $('.footable').footable();
                }, 100);
            }
        };

        if (otherConfigurations != {}) {
            for (let keyOptions in otherConfigurations) {
                optionsObject[keyOptions] = otherConfigurations[keyOptions];
            }
        }

        let schema = conrollerVar.getSubSchemaJson(schemaName);
        for (let key in schema) {
            let isLink = false;
            let collunsConfig = {};
            collunsConfig["title"] = schema[key].label;
            collunsConfig["className"] = "nameColumn";
            collunsConfig["orderable"] = true;
            collunsConfig["searchable"] = true;

            if (typeof schema[key].dataTableConfig != 'undefined') {
                let dtConfig = schema[key].dataTableConfig;
                for (let keyOptions in dtConfig) {
                    if (keyOptions == 'link') {
                        let renderLink = function (cellData, renderType, currentRow) {
                            let link = '<a href="' + dtConfig['link'].router + '/' + currentRow[dtConfig['link'].field] + '">' + currentRow[key] + '</a>';
                            return link;
                        }
                        collunsConfig['render'] = renderLink;
                    } else if (keyOptions == 'RenderObjects') {

                        //Renderizar os objetos em uma tabela
                        if (dtConfig['RenderObjects'] == 'OnTable') {
                            let renderTable = function (cellData, renderType, currentRow) {
                                if (schema[key].formOptions && schema[key].formOptions.FIELD_SCHEMA)
                                    return tableRenderFunction(schema[key].formOptions.FIELD_SCHEMA, currentRow[key]);
                                else if (schema[key].formOptions && schema[key].formOptions.OPTIONSCOLLECTION) {
                                    //Renderizar a partir de uma Collectino
                                    let controllerTmp = Blaze._globalHelpers.getController(schema[key].formOptions.OPTIONSCOLLECTION.COLLECTION);
                                    let collectionSchema = schema[key].formOptions.OPTIONSCOLLECTION.COLLECTION_SCHEMA;
                                    return tableRenderFunction(controllerTmp.getSubSchemaJson(collectionSchema), currentRow[key]);
                                }
                            }
                            collunsConfig['render'] = renderTable;
                        } else if (dtConfig['RenderObjects'] == 'inList') { //Renderizar os objetos em uma lista
                            //To Do

                            let renderList = function (cellData, renderType, currentRow) {
                                return listRenderFunction(schema[key].formOptions.FIELD_SCHEMA, currentRow[key]);
                            }
                            collunsConfig['render'] = renderList;
                        }
                    } else {
                        collunsConfig[keyOptions] = dtConfig[keyOptions];

                    }

                }
            }

            //Se não existir link será renderizado o valor do campo
            if (isLink == false)
                collunsConfig["data"] = key;

            optionsObject.columns.push(collunsConfig);
        }

        return optionsObject;
    }

    /**
     * Returna uma tabela a partir de uma lista de objetos
     * @param schema utilizado na construção da tabela
     * @param listOfObjects lista de objetos que serão inseridos na tabela
     * @returns {string}
     */
    getTableViewFromSchemaAndListOfObjects(schema, listOfObjects) {

        let fieldTmp = '<table class="footable metro-synergiaMeteorBase" data-page-size="5"> \
        <thead><tr> ';
        let firstLine = true;
        for (let key in schema) {
            let fieldVisible = true;
            if (schema[key].dataTableConfig && schema[key].dataTableConfig.visible == false) {
                fieldVisible = false;
            }


            if (typeof schema[key].label != 'undefined' && fieldVisible) {
                if (firstLine) {
                    fieldTmp = fieldTmp + '<th data-toggle="true">' + schema[key].label + '</th>';
                    firstLine = false;
                }
                else
                    fieldTmp = fieldTmp + '<th data-hide="phone">' + schema[key].label + '</th>';
            }

        }
        fieldTmp = fieldTmp + '</tr></thead>';

        fieldTmp = fieldTmp + '<tbody>';

        for (let keyObject in listOfObjects) {
            fieldTmp = fieldTmp + '<tr>';
            for (let key in schema) {
                let fieldVisible = true;
                if (schema[key].dataTableConfig && schema[key].dataTableConfig.visible == false) {
                    fieldVisible = false;
                }

                if (typeof schema[key].label != 'undefined' && fieldVisible) {

                    if (typeof listOfObjects[keyObject] != 'undefined' && listOfObjects[keyObject] != null) {
                        let valor = listOfObjects[keyObject][key];

                        if (schema[key].type == Date && valor) {
                            let pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
                            valor = valor.toISOString().slice(0, 10).replace(pattern, '$3/$2/$1');
                        } else if (schema[key].type == Object && typeof schema[key].formOptions["FIELD_SCHEMA"] != 'undefined' && valor) {
                            console.log('TODo - Campo = Objeto');

                        }
                        fieldTmp = fieldTmp + '<td>' + valor + '</td>';
                    }

                }
            }
            fieldTmp = fieldTmp + '</tr>';
        }
        fieldTmp = fieldTmp + '</tbody></table>';

        return fieldTmp;
    }

    /**
     * Retorna uma lista a partir de uma lista de objetos
     * @param schema utilizado na construção da tabela
     * @param listOfObjects lista de objetos que serão inseridos na tabela
     * @returns {string}
     */
    getListViewFromSchemaAndListOfObjects(schema, listOfObjects) {

        //TO DO

        let fieldTmp = '<ul> \
        <thead><tr> ';

        for (let key in schema) {
            if (typeof schema[key].label != 'undefined') {
                fieldTmp = fieldTmp + '<th>' + schema[key].label + '</th>';
            }
        }
        fieldTmp = fieldTmp + '</tr></thead>';

        fieldTmp = fieldTmp + '<tbody>';

        for (let keyObject in listOfObjects) {
            fieldTmp = fieldTmp + '<tr>';
            for (let key in schema) {
                if (typeof schema[key].label != 'undefined') {

                    if (typeof listOfObjects[keyObject] != 'undefined') {
                        let valor = listOfObjects[keyObject][key];

                        if (schema[key].type == Date && valor) {
                            let pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
                            valor = valor.toISOString().slice(0, 10).replace(pattern, '$3/$2/$1');
                        } else if (schema[key].type == Object && typeof schema[key].formOptions["FIELD_SCHEMA"] != 'undefined' && valor) {
                            console.log('TODo - Campo = Objeto');

                        }
                        fieldTmp = fieldTmp + '<td>' + valor + '</td>';
                    }

                }
            }
            fieldTmp = fieldTmp + '</tr>';
        }
        fieldTmp = fieldTmp + '</tbody></table>';

        return fieldTmp;
    }


}

export const UtilsView = new ViewUtils();
