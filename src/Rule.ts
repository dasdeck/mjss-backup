

import Renderer from './Renderer';
import RuleList from './RuleList';
import Sheet from './Sheet';
import RuleListRenderer from './RuleListRenderer';

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

    render(renderer: RuleListRenderer):Renderer {
        const res = `${this.key}:${this.value};`;
        renderer.children.push(res);
        return res;
    }}