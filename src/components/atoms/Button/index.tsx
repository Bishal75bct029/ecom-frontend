import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

import style from './style.module.scss';

export type ButtonTypeGroup = 'primary' | 'secondary' | 'tertiary' | 'dashed' | 'plain' | 'secondary-red';

export type ButtonSizeGroup = 'small' | 'medium' | 'large';

export type ButtonType = {
  [k in ButtonTypeGroup]: string;
};

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: ButtonTypeGroup;
  backgroundColor?: string;
  loading?: boolean;
  loadingMessage?: string;
  size?: ButtonSizeGroup;
}

const buttonType: ButtonType = {
  primary: 'button--primary',
  secondary: 'button--secondary',
  tertiary: 'button--tertiary',
  dashed: 'button--dashed',
  plain: 'button--plain',
  'secondary-red': 'button--secondary-red',
};

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled,
  children,
  className,
  onClick,
  loading,
  loadingMessage,
  type = 'button',
  ...rest
}) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    className={[
      style.button,
      style[`button--${size}`],
      style[buttonType[variant]],
      disabled ? style.disabled : '',
      disabled ? 'cursor-na' : '',
      className,
    ].join(' ')}
    type={type}
    {...rest}
  >
    {loading ? (
      <>
        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
        {loadingMessage || 'Loading...'}
      </>
    ) : (
      children
    )}
  </button>
);

export default Button;
