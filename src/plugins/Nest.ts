import ContainerRuleRenderer from "../ContainerRuleRenderer";

export default class Nest {

    onProcess(renderer:ContainerRuleRenderer) {

        if (renderer.rule.rules) {

            while (renderer.parent && !isContainer(renderer.parent)) {

                debugger
                renderer.key = `${renderer.parent.key} ${renderer.key}`;
                renderer = renderer.parent.children.pop();
                renderer.parent = renderer.parent.parent;

                renderer.parent.children.push(renderer);

            }
        }
    }

};

function isContainer(renderer:ContainerRuleRenderer) {
    return !renderer.parent || !renderer.rule.parent || renderer.rule.key.indexOf('@media') === 0;
}
