import Rule from "../../Rule";
import ContainerRuleRenderer from "../../ContainerRuleRenderer";
import { patternExtend } from "./lib";

abstract class LazyStringSource {

    abstract ready():boolean

}
class LazyString extends String {

    source: LazyStringSource
    callback: Function
    fallback: string
    constructor(source, callback, fallback = '') {
        super()
        this.source = source;
        this.callback = callback;
        this.fallback = fallback;
    }

    toString() {
        return this.source.ready() ? this.callback() : this.fallback;
    }

    valueOf() {
        return this.toString();
    }
}

export default class ExtendRule extends Rule {

    className: string
    search: RegExp
    currentParrent: ContainerRuleRenderer
    all: boolean

    constructor(sheet, data, key, parent) {
        super(sheet, data, key, parent);

        this.all = this.value.all;
        const className = this.key.substr(patternExtend.length);
        const prefix = className[0] === '.' ? '.' : '';
        const search = className.substr(prefix.length);
        this.className = className;
        if (this.all) {
            this.search = new RegExp(/prefix(?:\b)search(?:\b[^-]|$)/g.source.replace('prefix', prefix).replace('search', search), 'g');
        } else {
            this.search = new RegExp(/(?:,|^)\s*prefix(?:\b)search(?:\b\s*(?:,|$))/g.source.replace('prefix', prefix).replace('search', search), 'g');
        }

    }

    render(r:ContainerRuleRenderer) {
        this.currentParrent = r;
        return ''
    }

    ready() {
        return !!this.currentParrent;
    }

    getTargetSelector() {

        return this.currentParrent.key;
    }

    apply(renderer) {

        const key = renderer.key;
        if (key && String(key).match(this.search)) {

            renderer.key = new LazyString(this, () => {
                const targetSelector = this.getTargetSelector();
                if (targetSelector) {

                    const selectors = key.split(', ');
                    if (this.value.all) {
                        selectors.forEach(selector => {
                            if (selector.match(this.search)) {
                                selectors.push({toString:() => selector.replace(this.className, targetSelector)});
                            }
                        });
                        return selectors.join(', ');
                    } else {
                        selectors.push(targetSelector);
                        return selectors.join(', ');
                    }
                } else {
                    return key;
                }
            }, key);

        }

    }

}
