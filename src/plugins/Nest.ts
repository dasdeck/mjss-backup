import ContainerRuleRenderer from "../ContainerRuleRenderer";
import RuleListRenderer from "../RuleListRenderer";

export default class Nest {

    onProcess(renderer:ContainerRuleRenderer) {

        if (renderer.rule.rules) {

            while (renderer.parent && !isContainer(renderer.parent)) {

                renderer.key = `${renderer.parent.key} ${renderer.key}`;
                renderer = renderer.parent.children.pop();
                renderer.parent = renderer.parent.parent;

                renderer.parent.children.push(renderer);

            }
        }
    }

};

function isContainer(renderer:RuleListRenderer) {
    if (!renderer.parent) {
        return true;
    } else if (renderer instanceof ContainerRuleRenderer) {
        return renderer.rule.key.indexOf('@media') === 0;
    }
}
