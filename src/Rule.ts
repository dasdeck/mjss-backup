

import Sheet from './Sheet';
import RuleListRenderer from './RuleListRenderer';

export default class Rule {

    sheet: Sheet
    parent: Rule

    key: any;
    value: any;

    constructor(sheet:Sheet, value:any, key:string, parent:Rule) {

        this.key = key;
        this.value = value;
        this.sheet = sheet;
        this.parent = parent;

        this.sheet.hook('onCreate', this);

    }

    render(renderer: RuleListRenderer) {
        const res = `${this.key}:${this.value};`;
        renderer.children.push(res);
    }}