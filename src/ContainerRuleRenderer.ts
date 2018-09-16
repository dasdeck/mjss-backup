import Renderer from './interface/Renderer';
import ContainerRule from './ContainerRule';
import {isString} from 'lodash';
import Sheet from './Sheet';
import RuleListRenderer from './RuleListRenderer';

export default class ContainerRuleRenderer extends RuleListRenderer {

    rule: ContainerRule
    key: any
    value: any

    constructor(rule: ContainerRule, parent: RuleListRenderer = null) {

        super(rule.rules, parent);

        Object.assign(this, {
            rule,
            key: rule.key,
            value: rule.value
        });
    }

    toString() {

        const rulesCss = super.toString();
        return rulesCss && `${this.key}{${rulesCss}}`;

    }
};