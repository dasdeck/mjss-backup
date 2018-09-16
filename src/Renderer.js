const {isString, isUndefined} = require('lodash');

module.exports = class Renderer {

    constructor(rule, parent = null) {

        Object.assign(this, {
            root: parent && parent.root || this,
            parent,
            rule,
            key: rule.key,
            value: rule.value,
            children: []
        });

        if (parent) {
            parent.children.push(this);
        }
    }

    toString() {

        this.rule.hook('onOutput', this);

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
