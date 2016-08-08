/**
 * Created by luizluz on 22/06/2016.
 */

class Util {

  constructor () {

  }

  /**
   * Clona um objeto.
   * @param obj - Objeto que será clonado
   * @returns {*} - Objeto clonado.
   */
  cloneObj (obj) {
    if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj)
      return obj;

    if (obj instanceof Date)
      var temp = new obj.constructor(); //or new Date(obj);
    else
      var temp = obj.constructor();

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        obj['isActiveClone'] = null;
        temp[key] = this.cloneObj(obj[key]);
        delete obj['isActiveClone'];
      }
    }

    return temp;
  }

  mergeObj (source1, source2) {
    /*
     * Properties from the Souce1 object will be copied to Source2 Object.
     * Note: This method will return a new merged object, Source1 and Source2 original values will not be replaced.
     * */
    var mergedObj = this.cloneObj(source2);// Copying Source2 to a new Object

    for (let attrname in source1) {
      if (mergedObj.hasOwnProperty(attrname)) {
        if (source1[attrname] != null && source1[attrname].constructor == Object) {
          /*
           * Recursive call if the property is an object,
           * Iterate the object and set all properties of the inner object.
           */
          mergedObj[attrname] = mergedObj(source1[attrname], mergedObj[attrname]);
        }

      } else {//else copy the property from source1
        mergedObj[attrname] = source1[attrname];

      }
    }

    return mergedObj;
  }

  /**
   * Converte Array em Object
   * @param arr Array que será convertido em um objeto
   * @returns Object
   */
  toObject (arr) {

    var objRetorno = {};
    if (arr !== undefined && arr != null) {
      for (let i = 0; i<arr.length; ++i) {
        try {
          if (arr[i] !== undefined)
            objRetorno[i] = JSON.parse(arr[i]);
        }
        catch (err) {
          if (arr[i] !== undefined)
            objRetorno[i] = arr[i];
        }

      }

      return objRetorno;
    } else {
      console.log('Valor indefinido');
    }

  }

  /**
   * Converte Array em Object Array
   * @param arr Array que será convertido em um array de objeto
   * @returns Object Array --> ([Object])
   */
  toObjectArray (arr) {


    var objArrRetorno = [];
    if (arr !== undefined && arr != null) {

      if (typeof arr == 'string') {
        arr = JSON.parse(arr);
      }

      for (let i = 0; i<arr.length; ++i) {
        try {
          if (arr[i] !== undefined)
            objArrRetorno[i] = JSON.parse(arr[i]);
        }
        catch (err) {
          if (arr[i] !== undefined) {
            objArrRetorno[i] = arr[i];
          }
        }

      }

      return objArrRetorno;
    } else {
      console.log('Valor indefinido');
    }

  }

  /**
   * Converte Object em Array
   * @param obj Object que será convertido em um Array
   * @returns Array
   */
  toArray (obj) {

    var arrRetorno = [];
    if (obj !== undefined && obj != null) {
      for (let i in obj) {
        try {

          if (obj[i] !== undefined) {
            let stringObjeto = '{"_id":"' + obj[i]._id + '"';
            for (let key in obj[i]) {
              if (key != '_id')
                stringObjeto = stringObjeto + ',"' + key + '":"' + obj[i][key] + '"';
            }
            arrRetorno[i] = stringObjeto + '}';

          }
        }
        catch (err) {
          if (obj[i] !== undefined)
            arrRetorno[i] = obj[i];
        }

      }

      return arrRetorno;
    } else {
      console.log('Valor indefinido');
    }

  }

}

export const Utils = new Util();