const {isArray, isObject, mapValues, size} = require('lodash');
const Renderer = require('./Renderer');

class BasicRule {
    constructor(options, value, key, parent) {
        this.key = key;
        this.value = value;
        this.options = options;
        this.parent = parent;

        this.hook('onCreate', this);

    }

    render(renderer) {
        const res = `${this.key}:${this.value};`;
        renderer.children.push(res);
        return res;
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

};
class Rule extends BasicRule {

    constructor(options, data, key, parent) {

        super(options, data, key, parent);

        if (isArray(data)) {
            this.args = data;
        } else if (size(data)) {
            this.rules = mapValues(data, (row, key) => this.createRule(row, key));
        }

    }

    createRule(data, key) {

        let rule = this.hook('createRule', this.options, data, key, this);
        if (!rule) {
            if (!isObject(data)) {
                rule = new BasicRule(this.options, data, key, this);
            } else {
                rule = new Rule(this.options, data, key, this);
            }
        }
        return rule;
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
