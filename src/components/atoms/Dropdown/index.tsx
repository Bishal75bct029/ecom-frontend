import React, { ReactNode } from 'react';
import { Dropdown, DropdownProps as BSDropdownProps } from 'react-bootstrap';
import style from './style.module.scss';

type DropdownItemVariant = 'red' | 'purple';

const varaints: Record<DropdownItemVariant, string> = {
  purple: style['dropdownItems--purple'],
  red: style['dropdownItems--red'],
};

interface DropdownProps extends Omit<BSDropdownProps, 'children'> {
  title?: string;
  profile?: { image: string; username: string; email: string; fallBackImage?: ReactNode };
  items: {
    value: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    icon?: ReactNode;
    className?: string;
    variant?: DropdownItemVariant;
  }[];
  className?: string;
  id?: string;
}

export const DropDown: React.FC<DropdownProps> = ({ title, profile, items, className, id, ...rest }) => {
  return (
    <Dropdown className={style.dropdown} {...rest}>
      <Dropdown.Toggle id={id || ''} className={[className, style.dropdownToggle].join(' ')}>
        {profile ? (
          <div
            className={[!profile?.image && profile.fallBackImage ? style.fallbackIcon : '', 'w-100', 'h-100'].join(' ')}
          >
            {profile?.image && <img src={profile?.image} className={style.profileImage} width={50} height={50} />}
            {!profile?.image && profile.fallBackImage}
          </div>
        ) : (
          <>{title}</>
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu className={[style.dropdownMenu, 'pb-0'].join(' ')}>
        {profile && (
          <div className={style.profile}>
            <div
              style={{ width: 80 }}
              className={[!profile?.image && profile.fallBackImage ? style.innerIcon : '', 'w-100', 'h-100'].join(' ')}
            >
              {profile?.image && <img src={profile?.image} className={style.image} />}
              {!profile?.image && profile.fallBackImage && profile.fallBackImage}
            </div>
            <div>
              <Dropdown.Item className={style.profileTitle}>{profile.username}</Dropdown.Item>
              <Dropdown.Item className={style.profileInfo}>{profile.email}</Dropdown.Item>
            </div>
          </div>
        )}
        {items.map(({ variant = 'purple', ...item }, index) => {
          return (
            <Dropdown.Item
              onClick={item.onClick}
              key={index}
              className={[style.dropdownItems, varaints[variant], item.className].join(' ')}
            >
              <div className={style.icons}>{item.icon}</div>
              {item.value}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};
