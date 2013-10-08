Integrators.CommonJS = {

    isSupported: function() {
        return typeof exports === "object" && exports;
    },

    integrate: function(module) {
        exports = module.getFactory().apply(module, module.getDependencies());
    }

}