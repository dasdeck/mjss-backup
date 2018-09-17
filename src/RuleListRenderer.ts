import Renderer from './interface/Renderer';
import Sheet from './Sheet';
import RuleList from './RuleList';
import {assign} from 'lodash';

export default class RuleListRenderer implements Renderer {

    list: RuleList
    parent: RuleListRenderer|any
    children: Array<Renderer>
    sheet: Sheet

    constructor(list: RuleList, parent: RuleListRenderer = null) {

        assign(this, {
            sheet: list.sheet,
            parent,
            list,
            children: []
        });

        if (parent) {
            parent.children.push(this);
        }
    }

    toString() {

        this.sheet.hook('onOutput', this);
        return this.children.map(v => v.toString()).filter(v => v).join('');

    }
}