

import Renderer from './interface/Renderer';
import RuleList from './RuleList';
import Sheet from './Sheet';
import ContainerRuleRenderer from './ContainerRuleRenderer';

export default class Rule {

    sheet: Sheet
    parent: Rule

    key: any;
    value: any;

    constructor(sheet, value, key, parent) {

        this.key = key;
        this.value = value;
        this.sheet = sheet;
        this.parent = parent;

        this.sheet.hook('onCreate', this);

    }

    render(renderer: ContainerRuleRenderer):Renderer {
        const res = `${this.key}:${this.value};`;
        renderer.children.push(res);
        return res;
    }}