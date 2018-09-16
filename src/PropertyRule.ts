import Renderer from './Renderer';
import Rule from './Rule';
export default class PropertyRule extends Rule {

    key: any
    value: any
    parent: Rule
    options: any

    constructor(options, value, key, parent) {

        super();

        this.key = key;
        this.value = value;
        this.options = options;
        this.parent = parent;

        this.hook('onCreate', this);

    }

    render(renderer: Renderer):Renderer {
        const res = `${this.key}:${this.value};`;
        renderer.children.push(res);
        return res;
    }


}