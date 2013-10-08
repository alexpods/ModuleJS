Integrators.Global = {

    isSupported: function() {
        return true;
    },

    integrate: function(module) {
        var global = this.getGlobal();

        global[module.getName()] = module.getFactory().apply(module, module.getDependencies());
    },

    getGlobal: function() {
        var Fn = Function, ev = eval;
        return (new Fn('return this'))() || ev('this');
    }
}