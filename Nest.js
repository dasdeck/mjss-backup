module.exports = class Nest {

    onCreate() {

    }

    onProcess(renderInfo) {

        if (renderInfo.rule.rules) {

            while (renderInfo && renderInfo.parent && !isContainer(renderInfo.parent)) {
                // const selectors = renderInfo.rule.key.split(', ');
                renderInfo.key = `${renderInfo.parent.key} ${renderInfo.key}`;
                renderInfo = renderInfo.parent.children.pop();
                renderInfo.parent = renderInfo.parent.parent;

                renderInfo.parent.children.push(renderInfo);

            }
        }


    }

}

function isContainer(renderInfo) {
    return !renderInfo.parent || !renderInfo.rule.parent || renderInfo.rule.key.indexOf('@media') === 0;
}
