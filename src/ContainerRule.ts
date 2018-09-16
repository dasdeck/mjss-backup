import Renderer from './Renderer';
import Rule from './Rule';
import RuleListRenderer from './RuleListRenderer';
import RuleList from './RuleList';
export default class ContainerRule extends Rule {

    rules: RuleList

    constructor(sheet, data, key = null, parent = null) {

        super(sheet, data, key, parent);
        this.rules = new RuleList(sheet, data, this);

    }

    render(parentRenderer: RuleListRenderer):Renderer {

        return this.rules.render(parentRenderer);

    }


}