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

    process(parentRenderInfo = null) {

        const renderInfo = createRenderInfo(this, parentRenderInfo);
        parentRenderInfo && parentRenderInfo.children.push(renderInfo);

        for (let i = 0; i < this.options.plugins.length; i++) {
            const plugin = this.options.plugins[i];
            plugin.onProcess(renderInfo);
        }

        if (renderInfo.children) {
            this.processChildren(renderInfo);

        }


        return renderInfo;
    }

    toString() {
        return this.process().toString();
    }
};

function createRenderInfo(rule, parent = null) {
    return parent && parent.rule === this ? parent : {
        parent,
        rule,
        key: rule.key,
        value: rule.value,
        children: [],

        toString() {
            if (this.children && this.children.length) { //render container rules (root, media, nested)

                const ruleContent = this.children.map(info => info.toString()).join('');

                if (this.rule && isString(this.key)) {
                    return `${this.key}{${ruleContent}}`;
                } else {
                    return ruleContent;
                }

            } else if (!isUndefined(this.value)) { //render end-rule or nothing if node is "empty"
                return `${this.key}:${this.value};`;
            }
        }
    };
}