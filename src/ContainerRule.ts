import {isArray, isObject, mapValues, size} from 'lodash';
import Renderer from './Renderer';
import PropertyRule from './PropertyRule';



export default class ContainerRule extends PropertyRule {

    options: any
    args: Array<any>
    rules: object

    constructor(options, data, key = null, parent = null) {

        super(options, data, key, parent);

        if (isArray(data)) {
            this.args = data;
        } else if (size(data)) {
            this.rules = mapValues(data, (row, key) => this.createRule(row, key));
        }

        this.hook('onCreate', this);


    }

    createRule(data, key) {

        let rule = this.hook('createRule', this.options, data, key, this);
        if (!rule) {
            if (!isObject(data)) {
                rule = new PropertyRule(this.options, data, key, this);
            } else {
                rule = new ContainerRule(this.options, data, key, this);
            }
        }
        return rule;
    }

    rednerChildren(renderer) {
        if (renderer.children && this.rules) {
            for (const key in this.rules) {
                const rule = this.rules[key];
                rule.render(renderer);
            }
        }
    }

    render(parentRenderer = null) {

        const renderer = new Renderer(this, parentRenderer);

        this.hook('onProcess', renderer);

        this.rednerChildren(renderer);

        return renderer;
    }

    toString() {
        return this.render().toString();
    }
}


module.exports = {
    PropertyRule,
    ContainerRule
};
