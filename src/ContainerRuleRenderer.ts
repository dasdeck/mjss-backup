import Renderer from './Renderer';
import ContainerRule from './ContainerRule';
import {isString} from 'lodash';

export default class ContainerRuleRenderer implements Renderer {

    rule: ContainerRule
    parent: Renderer
    key: any
    value: any
    children: Array<Renderer>

    constructor(rule: ContainerRule, parent: ContainerRuleRenderer = null) {

        Object.assign(this, {
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

        if (this.children && this.children.length) { // render container rules (root, media, nested)

            const ruleContent = this.children.map(info => info.toString()).join('');

            if (this.rule && isString(this.key)) {
                return `${this.key}{${ruleContent}}`;
            } else {
                return ruleContent;
            }

        }
    }
};