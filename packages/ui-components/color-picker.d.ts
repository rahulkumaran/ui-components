/// <reference types="react" />
import React from 'react';
import { HTMLInputElementProps } from './text-input';
export declare function getPalettePosition(clientHeight: number, paletteTriggerRect: ClientRect, initialPaletteRect: ClientRect): {
    top: number;
    left: number;
};
export interface ColorPickerPropsTypes {
    labelText?: string;
    name: string;
    id: string;
    resetValue?: string;
    value: string;
    textDisabled?: boolean;
    onChange: (event: React.SyntheticEvent<any>, value: string) => void;
}
export declare class ColorPicker extends React.Component<ColorPickerPropsTypes & HTMLInputElementProps, {
    displayColorPalette: boolean;
    top: number;
    left: number;
}> {
    readonly state: {
        displayColorPalette: boolean;
        left: number;
        top: number;
    };
    private paletteTriggerRect;
    private colorPaletteButton;
    render(): JSX.Element;
    private onReset;
    private handleChangeFromTextInput;
    private handleChangeFromColorPalette;
    private toggleColorPalette;
    private handleColorPaletteMount;
}
export default ColorPicker;
