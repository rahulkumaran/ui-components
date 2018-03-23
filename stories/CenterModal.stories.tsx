import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React, { Component } from 'react';

import Button from '../src/components/Button';
import ButtonList from '../src/components/ButtonList';
import { CenterModal } from '../src/components/CenterModal';

const stories = storiesOf('CenterModal', module);

// Need a way to close/open the modal
class ExampleContainer extends Component<any, { isOpen: boolean }> {
  constructor(props: any) {
    super(props);

    this.state = { isOpen: false };
  }

  public open = (e: any) => { this.setState({ isOpen: true }); };
  public close = (e: any) => { this.setState({ isOpen: false }); };

  public render() {
    return (
      <div>
        <Button type="primary" onClick={this.open}>Open Modal</Button>
        <CenterModal
          hasX={this.props.hasX}
          onClose={this.close}
          open={this.state.isOpen}
          renderBody={this.props.renderBody}
          renderFooter={this.props.renderFooter ? () => this.props.renderFooter(this.close) : null}
          renderHeader={this.props.renderHeader}
        />
      </div>
    );
  }
}

stories.add('CenterModal with footer and header, no x', () => (
  <ExampleContainer
    renderHeader="Scorpion XING Zone 🦂"
    renderBody={() => (
      <p>
        Please do not feed the scorpions.
        Doing so could result in scorpion wounds, fines of up to $2,500 and up to 5 years of community service.
      </p>
    )}
    renderFooter={(close: (e: any) => void) => (
      <ButtonList>
        <Button small type="secondary" onClick={close}>Cancel</Button>
        <Button small type="primary" onClick={close}>Confirm</Button>
      </ButtonList>
    )}
  />
));

stories.add('CenterModal without footer or header, with x', () => (
  <ExampleContainer
    hasX
    renderBody={() => (
      <p>
        Please do not feed the scorpions.
        Doing so could result in scorpion wounds, fines of up to $2,500 and up to 5 years of community service.
      </p>
    )}
  />
));
