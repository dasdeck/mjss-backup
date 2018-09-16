const {isArray, isObject, mapValues, size} = require('lodash');
const Renderer = require('./Renderer');
class Rule {

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
            this.rules = mapValues(data, (row, key) => this.createRule(row, key));
        }

        this.hook('onCreate', this);

    }

    createRule(data, key) {

        const rule = this.hook('createRule', this.options, data, key, this);
        return rule || new Rule(this.options, data, key, this);
    }

    hook(name, ...args) {

        for (let i = 0; i < this.options.plugins.length; i++) {
            const plugin = this.options.plugins[i];
            const res = plugin[name] && plugin[name](...args);
            if (res) {
                return res;
            }
        }
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

        this.hook('onProcess', renderer);

        this.rednerChildren(renderer);

        return renderer;
    }

    toString() {
        return this.render().toString();
    }
}

class Muted extends Rule {
    render() {

    }
}
Rule.Muted = Muted;

module.exports = Rule;
