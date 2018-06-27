import React from 'react';
import Styles from './styles/badge.module.scss';
import { color as validColor } from './types/color';
import cn from './utilities/classnames';

export interface BadgeProps {
  children?: string | number;
  color?: string;
  content?: string | number;
  className?: string;
  gradient?: boolean;
}

export const Badge: React.SFC<BadgeProps> = ({
  children,
  color,
  content,
  className,
  gradient,
  ...attributes
}) => (
  <span
    className={cn(
      'badge',
      Styles.badge,
      gradient ? Styles.gradient : Styles[color]
    )}
    {...attributes}
  >
    {children || content}
  </span>
);

Badge.defaultProps = {
  children: 0,
  className: '',
  color: '',
};

export default Badge;
