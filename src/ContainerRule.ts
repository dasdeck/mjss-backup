import Renderer from './interface/Renderer';
import Rule from './Rule';
import ContainerRuleRenderer from './ContainerRuleRenderer';
import RuleList from './RuleList';
export default class ContainerRule extends Rule {

    rules: RuleList

    constructor(sheet, data, key = null, parent = null) {

        super(sheet, data, key, parent);
        this.rules = new RuleList(sheet, data, this);

    }



    render(parentRenderer:ContainerRuleRenderer = null) {

        const renderer = new ContainerRuleRenderer(this, parentRenderer);

        this.sheet.hook('onProcess', renderer);

        this.rules.rednerChildren(renderer);

        return renderer;
    }

    toString() {
        return this.render().toString();
    }


}