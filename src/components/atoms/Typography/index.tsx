import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';
import styles from './style.module.scss';

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
  | 'silver-500'
  | 'silver-700';

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
  style?: React.CSSProperties;
}

const colorsClass: Record<TypographyColors, string> = {
  inherit: '',
  'primary-purple': styles.colorPrimaryPurple,
  'primary-teal': styles.colorPrimaryTeal,
  'secondary-blue': styles.colorSecondaryBlue,
  'secondary-red': styles.colorSecondaryRed,
  'secondary-pink': styles.colorSecondaryPink,
  'secondary-orange': styles.colorSecondaryOrange,
  'secondary-yellow': styles.colorSecondaryYellow,
  'secondary-gold': styles.colorSecondaryGold,
  'silver-500': styles.colorSilver500,
  'silver-700': styles.colorSilver700,
};

const fontStyle: Record<TypographyFontsStyle, string> = {
  inherit: '',
  'caption-normal': styles.captionNormal,
  'caption-semi-bold': styles.captionSemiBold,
  'small-regular': styles.smallRegular,
  'small-semi-bold': styles.smallSemiBold,
  'small-bold': styles.smallBold,
  'base-regular': styles.baseRegular,
  'base-semi-bold': styles.baseSemiBold,
  'base-bold': styles.baseBold,
  'large-regular': styles.largeRegular,
  'large-semi-bold': styles.largeSemiBold,
  'large-bold': styles.largeBold,
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
  style,
}) => {
  const VariableComponent = component;
  const componentClass = [
    styles.typography,
    colorsClass[color],
    className || '',
    fontStyle[fontsStyle as keyof typeof fontStyle],
  ];

  return (
    <VariableComponent className={componentClass.join(' ')} onClick={onClick} role={role} id={id} style={style}>
      {children}
    </VariableComponent>
  );
};

export default Typography;
