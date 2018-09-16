const {startsWith} = require('lodash');
const Rule = require('../Rule');

const lookup = '@extend ';

/* extend may fail if the parent key is changed by another plugin */
class ExtendRule extends Rule.Muted {

    constructor(...args) {
        super(...args);
        const className = this.key.substr(lookup.length);
        const prefix = className[0] === '.' ? '.' : '';
        const search = className.substr(prefix.length);
        this.className = className;
        this.search = new RegExp(/prefix(?:\b)search(?:\b[^-]|$)/g.source.replace('prefix', prefix).replace('search', search));

    }

    apply(renderer) {

        if(renderer.key && renderer.key.match(this.search)) {
            const selectors = renderer.key.split(', ');
            const selectorToAdd = this.parent.key;
            if (this.data.all) {
                selectors.forEach(selector => {
                    if(selector.match(this.search)) {
                        selectors.push(selector.replace(this.className, selectorToAdd));
                    }
                });
            } else if(selectors.includes(this.className)) {
                selectors.push(selectorToAdd);
            }
            renderer.key = selectors.join(', ');
        }
    }

}

module.exports = class Extend {

    constructor() {
        this.extends = [];
    }

    createRule(options, rules, key) {
        if (startsWith(key, lookup)) {
            const rule = new ExtendRule(...arguments);
            this.extends.push(rule);
            return rule;
        }
    }

    onProcess(renderer) {

        for(let i = 0; i < this.extends.length; i++) {
            const extend = this.extends[i];
            extend.apply(renderer);
        }

    }

};
