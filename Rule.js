const {isString, isUndefined, isArray, isObject, mapValues, forEach, size } = require('lodash');

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

    processChildren(renderInfo) {
        if (this.rules) {
            for (const key in this.rules) {
                const rule = this.rules[key];
                rule.process(renderInfo);
            }
        }
    }

    process(parentRenderInfo) {

        const renderInfo = createRenderInfo(this, parentRenderInfo);
        parentRenderInfo.children.push(renderInfo);

        this.processChildren(renderInfo);

        for (let i = 0; i < this.options.plugins.length; i++) {
            const plugin = this.options.plugins[i];
            plugin.onProcess(this, parentRenderInfo);
        }
    }

    toString() {

        const renderInfo = createRenderInfo();
        this.process(renderInfo);
        return renderInfo.toString();

    }
};

function createRenderInfo(rule, parent = null) {
    return parent && parent.rule === this ? parent : {
        parent,
        rule,
        children: [],

        toString() {
            if (this.children.length) { //render container rules (root, media, nested)

                const ruleContent = this.children.map(info => info.toString()).join('');

                if (this.rule && isString(this.rule.key)) {
                    return `${this.rule.key}{${ruleContent}}`;
                } else {
                    return ruleContent;
                }

            } else if (!isUndefined(this.rule.value)) { //render end-rule or nothing if node is "empty"
                return `${this.rule.key}:${this.rule.value};`;
            }
        }
    };
}