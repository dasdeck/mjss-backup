import {startsWith} from 'lodash';
import Rule from '../Rule';

const lookup = '@extend ';

/* extend may fail if the parent key is changed dynamically
by another plugin (Exp will work fine though) */
class ExtendRule extends Rule {

    className: string
    search: RegExp

    constructor(sheet, data, key, parent) {
        super(sheet, data, key, parent);
        const className = this.key.substr(lookup.length);
        const prefix = className[0] === '.' ? '.' : '';
        const search = className.substr(prefix.length);
        this.className = className;
        this.search = new RegExp(/prefix(?:\b)search(?:\b[^-]|$)/g.source.replace('prefix', prefix).replace('search', search));

    }
    render() {}

    apply(renderer) {

        if (renderer.key && renderer.key.match(this.search)) {
            debugger
            const selectors = renderer.key.split(', ');
            const selectorToAdd = this.parent.key;
            if (this.value.all) {
                selectors.forEach(selector => {
                    if (selector.match(this.search)) {
                        selectors.push(selector.replace(this.className, selectorToAdd));
                    }
                });
            } else if (selectors.includes(this.className)) {
                selectors.push(selectorToAdd);
            }
            renderer.key = selectors.join(', ');
        }

    }

}

export default class Extend {

    extends: Array<ExtendRule> = []

    createRule(sheet, rules, key, list) {
        if (startsWith(key, lookup)) {
            const rule = new ExtendRule(sheet, rules, key, list.rule);
            this.extends.push(rule);
            return rule;
        }
    }

    onProcess(renderer) {

        for (let i = 0; i < this.extends.length; i++) {
            const extend = this.extends[i];
            extend.apply(renderer);
        }

    }

};
