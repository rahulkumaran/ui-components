import debounce from 'lodash/debounce';
import React from 'react';
import { CustomPicker, } from 'react-color';
import { Saturation } from 'react-color/lib/components/common';
import { createPortal } from 'react-dom';
import cn from '../utilities/classnames';
import ColorControls from './colorControls';
import ColorStorage from './colorStorage';
import DismissableBackground from './dismissableBackground';
import HueSlider from './hueSlider';
import Styles from '../styles/color-palette.module.scss';
class ColorPalette extends React.Component {
    constructor() {
        super(...arguments);
        this.onChange = color => {
            this.props.onChange(color);
            this.onChangeComplete(color);
        };
    }
    componentDidMount() {
        this.props.onMount(this.palette && this.palette.getBoundingClientRect());
        this.onChangeComplete = this.props.onChangeComplete
            ? debounce(this.props.onChangeComplete, 100)
            : () => { };
    }
    render() {
        const { toggleColorPalette, top = 0, left = 0 } = this.props;
        const injectedProps = {
            hex: this.props.hex,
            hsl: this.props.hsl,
            onChange: this.onChange,
            rgb: this.props.rgb,
        };
        return createPortal(React.createElement(DismissableBackground, { onClick: toggleColorPalette },
            React.createElement("div", { className: cn(Styles['color-palette'], {
                    [Styles['text-disabled']]: this.props.textDisabled,
                }), style: { top, left }, ref: p => {
                    this.palette = p;
                } },
                React.createElement("div", { className: Styles.saturation },
                    React.createElement(Saturation, Object.assign({}, this.props, { onChange: this.onChange }))),
                React.createElement(HueSlider, Object.assign({}, injectedProps)),
                React.createElement(ColorControls, { colorProps: injectedProps }),
                React.createElement(ColorStorage, { color: injectedProps.hex, onChange: this.onChange }))), document.body);
    }
}
export default CustomPicker(ColorPalette);
//# sourceMappingURL=index.js.map