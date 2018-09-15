const {isArray, isObject, mapValues, size } = require('lodash');
const Renderer = require('./Renderer');
module.exports = class Rule {

    constructor(options, data, key, parent) {

        this.options = options;
        this.data = data;
        this.key = key,
        this.parent = parent;

        if (!isObject(data)) {
            this.value = data;
        } else if (isArray(data)) {
            this.args = data;
        } else if (size(data)) {
            this.rules = mapValues(data, (row, key) => new Rule(options, row, key, this));
        }

        this.options.plugins.forEach(plugin => {
            plugin.onCreate(this);
        });

    }

    rednerChildren(renderer) {
        if (renderer.children && this.rules) {
            for (const key in this.rules) {
                const rule = this.rules[key];
                rule.render(renderer);
            }
        }
    }

    render(parentRenderer = null) {

        const renderer = new Renderer(this, parentRenderer);

        for (let i = 0; i < this.options.plugins.length; i++) {
            const plugin = this.options.plugins[i];
            plugin.onProcess(renderer);
        }

        this.rednerChildren(renderer);

        return renderer;
    }

    toString() {
        return this.render().toString();
    }
};
