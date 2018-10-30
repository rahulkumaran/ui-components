import debounce from 'lodash/debounce';
import React from 'react';
import {
  Color,
  ColorResult,
  CustomPicker,
  HSLColor,
  RGBColor,
} from 'react-color';
import { Saturation } from 'react-color/lib/components/common';
import { ColorWrapChangeHandler } from 'react-color/lib/components/common/ColorWrap';
import {
  ExportedColorProps,
  InjectedColorProps,
} from 'react-color/lib/components/common/ColorWrap';
import { createPortal } from 'react-dom';
import cn from '../utilities/classnames';

import ColorControls from './colorControls';
import ColorStorage from './colorStorage';
import DismissableBackground from './dismissableBackground';
import HueSlider from './hueSlider';

import Styles from '../styles/color-palette.module.scss';

export interface ColorPaletteProps {
  onMount: (rectangle: any) => void;
  toggleColorPalette: (rectangle: any) => void;
  onChangeComplete?: ColorWrapChangeHandler;
  textDisabled?: boolean;
  top?: number;
  left?: number;
}

class ColorPalette extends React.Component<
  ColorPaletteProps & InjectedColorProps
> {
  public onChangeComplete: ColorWrapChangeHandler;
  public palette: Element;
  public componentDidMount() {
    this.props.onMount(this.palette && this.palette.getBoundingClientRect());
    this.onChangeComplete = this.props.onChangeComplete
      ? debounce(this.props.onChangeComplete, 100)
      : () => {};
  }

  public render() {
    const { toggleColorPalette, top = 0, left = 0 } = this.props;
    const injectedProps = {
      hex: this.props.hex,
      hsl: this.props.hsl,
      onChange: this.onChange,
      rgb: this.props.rgb,
    };
    return createPortal(
      <DismissableBackground onClick={toggleColorPalette}>
        <div
          className={cn(Styles['color-palette'], {
            [Styles['text-disabled']]: this.props.textDisabled,
          })}
          style={{ top, left }}
          ref={p => {
            this.palette = p;
          }}
        >
          <div className={Styles.saturation}>
            <Saturation {...this.props} onChange={this.onChange} />
          </div>
          <HueSlider {...injectedProps} />
          <ColorControls colorProps={injectedProps} />
          <ColorStorage color={injectedProps.hex} onChange={this.onChange} />
        </div>
      </DismissableBackground>,
      document.body
    );
  }

  private onChange: ColorWrapChangeHandler = color => {
    this.props.onChange(color);
    this.onChangeComplete(color);
  };
}

export default CustomPicker<ColorPaletteProps>(ColorPalette);
