import Renderer from './interface/Renderer';
import ContainerRule from './ContainerRule';
import {isString} from 'lodash';
import Sheet from './Sheet';

export default class ContainerRuleRenderer implements Renderer {

    rule: ContainerRule
    parent: ContainerRuleRenderer
    key: any
    value: any
    children: Array<Renderer>
    sheet: Sheet

    constructor(rule: ContainerRule, parent: ContainerRuleRenderer = null) {

        Object.assign(this, {
            sheet: rule.rules.sheet,
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

        this.sheet.hook('onOutput', this);

        if (this.children.length) { // render container rules (root, media, nested)

            const ruleContent = this.children.map(info => info.toString()).join('');
            return `${this.key}{${ruleContent}}`;

        }
    }
};