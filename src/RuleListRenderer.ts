import Renderer from './interface/Renderer';
import ContainerRule from './ContainerRule';
import {isString} from 'lodash';
import Sheet from './Sheet';
import RuleList from './RuleList';

export default class RuleListRenderer implements Renderer {

    list: RuleList
    parent: RuleListRenderer
    children: Array<Renderer>
    sheet: Sheet

    constructor(list: RuleList, parent: RuleListRenderer = null) {

        Object.assign(this, {
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
};