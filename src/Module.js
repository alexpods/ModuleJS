var Module = function(params) {
    this._name         = params.name;
    this._dependencies = params.dependencies;
    this._factory      = params.factory;
}

Module.prototype = {
    getName: function() {
        return this._name;
    },
    getDependencies: function() {
        return this._dependencies;
    },
    getFactory: function() {
        return this._factory;
    }
}