import Renderer from './Renderer';
import ContainerRule from './RuleList';
import {isString} from 'lodash';
import RuleList from './RuleList';
import Sheet from './Sheet';
import Rule from './Rule';

export default class RuleListRenderer implements Renderer {

    rule: ContainerRule
    parent: Renderer
    key: any
    value: any
    children: Array<Renderer>
    sheet: Sheet

    constructor(list: RuleList, parent: RuleListRenderer = null) {

        const rule: Rule = list.rule;
        Object.assign(this, {
            sheet: list.sheet,
            parent,
            rule,
            key: rule && rule.key,
            value: rule && rule.value,
            children: []
        });

        if (parent) {
            parent.children.push(this);
        }
    }

    toString() {

        this.sheet.hook('onOutput', this);

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