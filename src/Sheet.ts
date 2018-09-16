import RuleList from './RuleList';

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
        const list = new RuleList(this);
        return list.toString();
    }
}

