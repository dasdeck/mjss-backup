import {isPlainObject} from 'lodash';
import EnvRule from './EnvRule';
import {isEvaluable} from './lib';
import DynamicContainerRule from './DynamicContainerRule';
import DynamicRule from './DynamicRule';
import MixinCall from './MixinCall';


export default class Exp {

    stack: Array<any>
    options: any
    onOutput: Function
    env: EnvRule

    constructor(options = {forceUniqueKeys: false}) {
        this.options = options;
        this.stack = [];
    }

    createRule(sheet, rules, key, parent) {
        if (key === '@env') {
            this.env = new EnvRule(sheet, rules, '@env');
            return this.env;
        } else if (isEvaluable(key) && isPlainObject(rules)) {
            return new DynamicContainerRule(sheet, rules, key, parent, this)
        } else if (isEvaluable(key) || isEvaluable(rules)) {
            return new DynamicRule(sheet, rules, key, parent, this)
        }
    }

    getContext() {
        const self = this;
        return {
            arg(name) {
                return self.stack[self.stack.length - 1][name];
            },
            env(name) {
                return self.env.rules.rules[name].value;
            },
            call(name, args = {}) {
                return new MixinCall(self.env.rules.rules[name], args, self);
            }
        };
    }

};




