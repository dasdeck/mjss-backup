import RuleListRenderer from "../../RuleListRenderer";
import ContainerRuleRenderer from "../../ContainerRuleRenderer";

export const reExplicitNest = /&/g;

export function isContainer(renderer:RuleListRenderer) {
    if (!renderer.parent) {
        return true;
    } else if (renderer instanceof ContainerRuleRenderer) {
        return renderer.rule.key.indexOf('@media') === 0;
    }
}
