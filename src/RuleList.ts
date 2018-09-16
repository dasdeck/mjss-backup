import {isArray, isObject, mapValues, size} from 'lodash';
import ContainerRule from './ContainerRule';
import Sheet from './Sheet';
import Rule from './Rule';
import ContainerRuleRenderer from './ContainerRuleRenderer';

export default class RuleList {

    sheet: Sheet
    args: Array<any>
    rules: object
    rule: Rule

    constructor(sheet, data = sheet.data, rule = null) {

        this.sheet = sheet;
        this.rule = rule;
        this.rules = mapValues(data, (row, key) => this.createRule(row, key));

        this.sheet.hook('onCreate', this);

    }

    createRule(data, key) {

        let rule = this.sheet.hook('createRule', this.sheet, data, key, this);
        if (!rule) {
            if (!isObject(data)) {
                rule = new Rule(this.sheet, data, key, this);
            } else {
                rule = new ContainerRule(this.sheet, data, key, this);
            }
        }
        return rule;
    }

    rednerChildren(renderer) {
        if (renderer.children && this.rules) {
            for (const key in this.rules) {
                const rule = this.rules[key];
                rule.render(renderer);
            }
        }
    }


}
