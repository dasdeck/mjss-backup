

import Sheet from './Sheet';
import Renderable from './interface/Renderable';
import Rule from './Rule';

export default class RuleRender implements Renderable {

    rule: Rule
    key: string
    value: string
    sheet: Sheet

    constructor(rule:Rule) {

        this.sheet = rule.sheet;
        this.rule = rule;
        this.key = rule.key;
        this.value = rule.value;

    }

    toString() {
        this.sheet.hook('onOutput', this);
        return `${this.key}:${this.value};`;
    }

}

