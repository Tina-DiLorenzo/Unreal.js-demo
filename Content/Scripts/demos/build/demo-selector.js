const React = require('react');
const ReactUMG = require('react-umg');
const { hex2lc, ltrb } = require('./lib/utils');
const { palette } = require('google-material-color');

const font = {
    FontObject: GEngine.SmallFont,
    Size: 15
};

class DemoSelector extends React.Component {
    render() {
        let C = palette.Blue;
        let { scenes, done } = this.props;
        return React.createElement(
            'div',
            null,
            React.createElement(
                'uBorder',
                {
                    BrushColor: hex2lc(C[800], 0.75),
                    Padding: ltrb(20, 10)
                },
                React.createElement(
                    'span',
                    null,
                    React.createElement('text', { Text: 'Unreal.js demos' }),
                    scenes.map(x => React.createElement(
                        'uButton',
                        { key: x,
                            Slot: { Size: { SizeRule: 'Fill' } },
                            OnClicked: () => done(x),
                            ToolTipText: x.description
                        },
                        React.createElement('text', { Font: font, Text: x })
                    ))
                )
            )
        );
    }
}

module.exports = async function (defer, scenes) {
    let comp;
    let p = new Promise(resolve => {
        comp = ReactUMG.wrap(React.createElement(DemoSelector, { scenes: scenes, done: resolve }));
    });
    function close() {
        if (!comp) return;
        comp.RemoveFromViewport();
    }
    comp.AddToViewport();
    defer(close);
    return await p;
};