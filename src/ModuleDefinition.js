var ModuleDefinition = function(integrators, Module) {

    var self = function(name, dependencies, factory) {
        if (typeof factory === 'undefined') {
            factory      = dependencies;
            dependencies = [];
        }

        self.integrate(self.createModule(name, dependencies, factory));
    };

    self._integrators = {};
    self._Module      = null;

    for (var property in ModuleDefinition.prototype) {
        self[property] = ModuleDefinition.prototype[property];
    }

    self.setIntegrators(integrators);
    self.setModuleClass(Module);

    return self;
}

ModuleDefinition.prototype = {

    integrate: function(module) {
        if (!(module instanceof this._Module)) {
            throw new Error('Module does not instance of module class!');
        }
        for (var name in this._integrators) {
            var integrator = this._integrators[name];
            if (integrator.isSupported()) {
                integrator.integrate(module);
                break;
            }
        }
    },

    getIntegrator: function(name) {
        if (!name in this._integrators) {
            throw new Error('Integrator "' + name + '" does not exists!');
        }
        return this._integrators[name];
    },

    getIntegrators: function() {
        return this._integrators;
    },

    setIntegrator: function(name, integrator) {
        this._integrators[name] = integrator;
        return this;
    },

    setIntegrators: function(integrators) {
        for (var name in integrators) {
            this.setIntegrator(name, integrators[name]);
        }
        return this;
    },

    setModuleClass: function(Module) {
        this._Module = Module;
        return this;
    },

    getModuleClass: function() {
        return this._Module;
    },

    createModule: function(name, dependencies, factory) {
        return new this.getModuleClass()({
            name:           name,
            dependencies:   dependencies,
            factory:        factory
        })
    }
}