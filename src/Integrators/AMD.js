Integrators.AMD = {

    isSupported: function() {
        return typeof define === 'function' && define.amd
    },

    integrate: function(module) {
        define(module.getName(), module.getDependencies(), module.getFactory());
    }
}