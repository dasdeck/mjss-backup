

import Sheet from './Sheet';
import RuleListRenderer from './RuleListRenderer';
import Renderer from './interface/Renderer';
import RuleRender from './RuleRenderer';

export default class Rule implements Renderer {

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
        renderer.children.push(new RuleRender(this));
    }

}

