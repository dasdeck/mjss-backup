

import Renderer from './Renderer';

export default abstract class Rule {

    abstract options: any

    hook(name, ...args) {

        for (let i = 0; i < this.options.plugins.length; i++) {
            const plugin = this.options.plugins[i];
            const res = plugin[name] && plugin[name](...args);
            if (res) {
                return res;
            }
        }
    }

    public abstract render(renderer: Renderer):Renderer
}