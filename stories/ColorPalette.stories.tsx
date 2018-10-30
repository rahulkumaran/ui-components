import { storiesOf } from '@storybook/react';
import React from 'react';

import ColorPalette from '../src/color-palette';
import ColorPicker from '../src/color-picker';
const stories = storiesOf('Color Palette', module);


class ColorWrapper extends React.Component<any, {value: string}> {
  public state = {
    value: ''
  }
  public onChange = (e: React.SyntheticEvent<HTMLInputElement>, value: string) => {
    this.setState({ value });
  }
  public render(){
    return ( 
    <ColorPicker
      onChange={this.onChange}
      value={this.state.value}
      data-role="color-value"
      resetValue=""
      name="color-story"
      id="test-color"
      {...this.props}
    />);
  }
}

stories.add('Color Picker', () => <ColorWrapper />);
stories.add('Text Disabled', () => <ColorWrapper textDisabled/>);

stories.add('Bare', () => (
  <ColorPalette
    toggleColorPalette={()=>{}}
    onChange={() => {}}
    onMount={() => {}}
  />
));
