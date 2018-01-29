import React from 'react';
import cn from '../utilities/classnames';

export type TooltipDirection = 'up' | 'down' | 'left' | 'right';

export interface TooltipProps {
  content?: string;
  direction?: TooltipDirection;
  className?: string;
  children?: React.ReactElement<any>;
}

export const Tooltip: React.SFC<TooltipProps> = ({
  content,
  direction,
  className,
  children,
}) => {
  return (
    <span
      className={className}
      data-tooltip={content}
      data-tooltip-pos={direction}
    >
      {children}
    </span>
  );
};

export type HtmlTooltipDirection = 'left' | 'right';

export interface HTMLTooltipProps {
  direction?: TooltipDirection;
  className?: string;
  children?: React.ReactElement<any>;
  hoverTarget?: React.ReactElement<any>;
}

export interface HTMLTooltipState {
  hovered: boolean;
  tooltipHeight: number;
  opened: boolean;
}

export class HTMLTooltip extends React.Component<
  HTMLTooltipProps,
  HTMLTooltipState
> {
  private tooltipRef: HTMLDivElement;

  constructor(props: HTMLTooltipProps) {
    super(props);

    this.state = {
      hovered: false,
      tooltipHeight: 0,
      opened: false,
    };

    this.handleHoverIn = this.handleHoverIn.bind(this);
    this.handleHoverOut = this.handleHoverOut.bind(this);
  }

  public static defaultProps = {
    direction: 'right',
    className: '',
  };

  public state = {
    hovered: false,
    tooltipHeight: 0,
    opened: false
  };

  public shouldComponentUpdate(nextProps?: any, nextState?: any) {
    if (this.state.opened === nextState.opened) {
      return false;
    }
    return true;
  };

  public handleHoverIn = () => {
    this.setState({ hovered: true, opened: true, tooltipHeight: this.tooltipRef.offsetHeight }, () => {
      
    });
  };

  public handleHoverOut = () => {
    this.setState({ hovered: false })
    setTimeout(() => {
      if (!this.state.hovered) {
        this.setState({ opened: false });
      }
    }, 1000);
  };

  render() {
    return (
      <div>
        <div className="tooltip-js-parent" onMouseEnter={this.handleHoverIn} onMouseLeave={this.handleHoverOut}>
          {this.props.hoverTarget}
        </div>
        <div
          className={cn(`tooltip-js-content ${this.props.className}`, {
            'is-left': this.props.direction === 'left',
            'is-visible': this.state.opened,
          })}
          style={{ top: -(this.state.tooltipHeight / 2) - 3 }}
          ref={input => {
            this.tooltipRef = input;
          }}
          onMouseEnter={this.handleHoverIn} onMouseLeave={this.handleHoverOut}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Tooltip;
