import Rule from './Rule';
import ContainerRuleRenderer from './ContainerRuleRenderer';
import RuleList from './RuleList';
import RuleListRenderer from './RuleListRenderer';
export default class ContainerRule extends Rule {

    rules: RuleList

    constructor(sheet, data, key = null, parent = null) {

        super(sheet, data, key, parent);
        this.rules = new RuleList(sheet, data, this);

    }

    render(parentRenderer:RuleListRenderer) {

        const renderer = new ContainerRuleRenderer(this, parentRenderer);

        this.sheet.hook('onProcess', renderer);

        this.rules.render(renderer);

    }

}