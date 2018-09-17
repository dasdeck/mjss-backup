import Rule from "../../Rule";
import ContainerRuleRenderer from "../../ContainerRuleRenderer";
import { lookup } from "./lib";

export default class ExtendRule extends Rule {

    className: string
    search: RegExp

    constructor(sheet, data, key, parent) {
        super(sheet, data, key, parent);
        const className = this.key.substr(lookup.length);
        const prefix = className[0] === '.' ? '.' : '';
        const search = className.substr(prefix.length);
        this.className = className;
        this.search = new RegExp(/prefix(?:\b)search(?:\b[^-]|$)/g.source.replace('prefix', prefix).replace('search', search));

    }

    render(r:ContainerRuleRenderer) { return ''}

    apply(renderer) {

        if (renderer.key && renderer.key.match(this.search)) {
            const selectors = renderer.key.split(', ');
            const selectorToAdd = this.parent.key;
            if (this.value.all) {
                selectors.forEach(selector => {
                    if (selector.match(this.search)) {
                        selectors.push(selector.replace(this.className, selectorToAdd));
                    }
                });
            } else if (selectors.includes(this.className)) {
                selectors.push(selectorToAdd);
            }
            renderer.key = selectors.join(', ');
        }

    }

}
