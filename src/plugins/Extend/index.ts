import {startsWith} from 'lodash';
import ExtendRule from './ExtendRule';
import {patternExtend} from './lib';


/* extend may fail if the parent key is changed dynamically
by another plugin (Exp will work fine though)
possible fix: store renderers of extend nodes to evaluate real parents
*/

export default class Extend {

    extends: Array<ExtendRule> = []

    createRule(sheet, rules, key, list) {
        if (startsWith(key, patternExtend)) {
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
