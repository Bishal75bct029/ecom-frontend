import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';
import style from './style.module.scss';

export type TypographyColors =
  | 'inherit'
  | 'primary-purple'
  | 'primary-teal'
  | 'secondary-blue'
  | 'secondary-red'
  | 'secondary-pink'
  | 'secondary-orange'
  | 'secondary-yellow'
  | 'secondary-gold'
  | 'silver';

export type TypographyFontsStyle =
  | 'inherit'
  | 'caption-normal'
  | 'caption-semi-bold'
  | 'small-regular'
  | 'small-semi-bold'
  | 'small-bold'
  | 'base-regular'
  | 'base-semi-bold'
  | 'base-bold'
  | 'large-regular'
  | 'large-semi-bold'
  | 'large-bold';

export interface TypographyProps {
  component?: FC<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>> | string;
  className?: string;
  color?: TypographyColors;
  children?: ReactNode;
  onClick?: () => void;
  fontsStyle?: TypographyFontsStyle;
  role?: string;
  id?: string;
}

const colorsClass: Record<TypographyColors, string> = {
  inherit: '',
  'primary-purple': style.colorPrimaryPurple,
  'primary-teal': style.colorPrimaryTeal,
  'secondary-blue': style.colorSecondaryBlue,
  'secondary-red': style.colorSecondaryRed,
  'secondary-pink': style.colorSecondaryPink,
  'secondary-orange': style.colorSecondaryOrange,
  'secondary-yellow': style.colorSecondaryYellow,
  'secondary-gold': style.colorSecondaryGold,
  silver: style.colorSilver,
};

const fontStyle: Record<TypographyFontsStyle, string> = {
  inherit: '',
  'caption-normal': style.captionNormal,
  'caption-semi-bold': style.captionSemiBold,
  'small-regular': style.smallRegular,
  'small-semi-bold': style.smallSemiBold,
  'small-bold': style.smallBold,
  'base-regular': style.baseRegular,
  'base-semi-bold': style.baseSemiBold,
  'base-bold': style.baseBold,
  'large-regular': style.largeRegular,
  'large-semi-bold': style.largeSemiBold,
  'large-bold': style.largeBold,
};

const Typography: FC<TypographyProps> = ({
  children,
  className,
  color = 'inherit',
  component = 'p',
  fontsStyle = 'inherit',
  role,
  onClick,
  id,
}) => {
  const VariableComponent = component;
  const componentClass = [
    style.typography,
    colorsClass[color],
    className || '',
    fontStyle[fontsStyle as keyof typeof fontStyle],
  ];

  return (
    <VariableComponent className={componentClass.join(' ')} onClick={onClick} role={role} id={id}>
      {children}
    </VariableComponent>
  );
};

export default Typography;
