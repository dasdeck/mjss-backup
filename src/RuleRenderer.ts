

import Sheet from './Sheet';
import RuleListRenderer from './RuleListRenderer';
import Renderer from './interface/Renderer';
import Rule from './Rule';

export default class RuleRender implements Renderer {

    rule: Rule
    key: string
    value: string

    constructor(rule:Rule) {

        this.rule = rule;
        this.key = rule.key;
        this.value = rule.value;

    }

    toString() {
        return `${this.key}:${this.value};`;
    }

}

