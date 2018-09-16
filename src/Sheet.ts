import RuleList from './RuleList';
import ContainerRule from './ContainerRule';

export default class Sheet {

    options: any
    data: any

    constructor(options: any, data = {}) {
        this.options = options;
        this.data = data;
    }

    hook(name, ...args) {

        for (let i = 0; i < this.options.plugins.length; i++) {
            const plugin = this.options.plugins[i];
            const res = plugin[name] && plugin[name](...args);
            if (res) {
                return res;
            }
        }
    }

    toString() {
        const root = new ContainerRule(this, this.data);
        return root.toString();
    }

}

