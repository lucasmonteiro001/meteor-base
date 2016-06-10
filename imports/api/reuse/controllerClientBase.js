export class controllerClientBase {


    constructor(collection) {
        this.myCollection = collection.getCollection();
        this.myModel = collection;
        this.filter = {};
        this.projection = {default: {}};

    }

    setFilter(filter) {
        this.filter = filter;
    }

    setProjection(projectionName, projectionData) {
        this.projection[projectionName] = projectionData;
    }

    getAll() {
        const collectionData = this.myCollection.find();
        if (collectionData) {
            return collectionData;
        }
    };

    getCollection() {
        return this.myCollection

    }

    getCollectionName() {
        return this.myCollection._name;
    }

    getSchema() {
        return this.myModel.getSchema();
    }

    get(id) {
        return this.myCollection.findOne(id);
    }

    applySubscribe(template, id = "", action = "default") {
        let filterTmp = this.filter;
        if (id != "") {
            filterTmp._id = id;
        } else {
            delete filterTmp._id;
        }
        template.subscribe(this.getCollectionName(), filterTmp, this.projection[action]);
    }

    insert(collectionData, callback) {
        Meteor.call(this.getCollectionName() + '.insert', collectionData, (error, result) => {
            if (error) {
                callback(error, null)
            } else {
                callback(null, result)
            }
        });
    }
    
    update(id, collectionData, callback) {
        Meteor.call(this.getCollectionName() + '.update', id, collectionData, (error) => {
            if (error) {
                callback(error, null)
            } else {
                callback(null, "ok")
            }
        });
    }

    remove(id, callback) {

        Meteor.call(this.getCollectionName() + '.remove', id, (error) => {
            if (error) {
                callback(error, null)
            } else {
                callback(null, "ok")
            }
        });
    }

    checkIfCanUserRemove(reactVar, id) {
        let idToCheck = id;
        if (typeof id === 'undefined' || id === null) {
            idToCheck = "id_Fake_For_Permit_this_action";
        } else {
            idToCheck = id;
        }
        Meteor.call('user.can.' + this.getCollectionName() + '.remove', idToCheck, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                reactVar.set(result);
            }
        });
    }

    checkIfCanUserInsert(reactVar) {
        Meteor.call('user.can.' + this.getCollectionName() + '.insert', (error, result) => {
            if (error) {
                console.log(error);
            } else {
                reactVar.set(result);
            }
        });
    }

    checkIfCanUserUpdate(reactVar, id) {
        let idToCheck = id;
        if (typeof id === 'undefined' || id === null) {
            idToCheck = "id_Fake_For_Permit_this_action";
        } else {
            idToCheck = id;
        }
        Meteor.call('user.can.' + this.getCollectionName() + '.update', idToCheck, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                reactVar.set(result);
            }
        });
    }

        checkIfCanUserView(reactVar, id) {
        let idToCheck = id;
        if (typeof id === 'undefined' || id === null) {
            idToCheck = "id_Fake_For_Permit_this_action";
        } else {
            idToCheck = id;
        }
        Meteor.call('user.can.' + this.getCollectionName() + '.read', idToCheck, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                reactVar.set(result);
            }
        });
    }


}


