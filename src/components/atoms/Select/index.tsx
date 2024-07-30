import { ReactNode, forwardRef, useCallback, useState } from 'react';
import ReactSelect, {
  components,
  MenuProps,
  OptionProps,
  SingleValueProps,
  ControlProps,
  MultiValueProps,
  PlaceholderProps,
  MenuListProps,
  Props,
  MultiValue as MultiValueType,
  SingleValue as SingleValueType,
} from 'react-select';
import { Controller, useFormContext } from 'react-hook-form';
import { HookErrorMessage, Typography } from '..';
import { HookInputBaseProps } from '../HookFormProvider';
import style from './style.module.scss';

export interface SelectOptionItem {
  value?: any;
  label?: ReactNode;
  viewLabel?: ReactNode;
}

interface CommonProps {
  label?: ReactNode;
  classes?: string;
}

export interface CustomStylesProps {
  showBorder?: boolean;
  hasError?: boolean;
  smallSize?: boolean;
  fullWidth?: boolean;
  menuIsOpen?: boolean;
  menuListClass?: string;
  controlClass?: string;
  menuClassname?: string;
  optionClass?: string;
}

export interface SingleSelectProps extends Props<SelectOptionItem, any>, CommonProps, CustomStylesProps {
  wrapperClassName?: string;
  errorNode?: ReactNode;
}

export interface HookSelectProps extends SingleSelectProps, CustomStylesProps, HookInputBaseProps {
  name: string;
  onChange?: (val: MultiValueType<SelectOptionItem> | SingleValueType<SelectOptionItem>) => void;
}

const { Option, SingleValue, Menu, Control, MultiValue, Placeholder, MenuList } = components;

const CustomSingleValue = (props: SingleValueProps<SelectOptionItem>) => (
  <SingleValue {...props}>{props.data.label}</SingleValue>
);

const CustomControl = (props: ControlProps<SelectOptionItem>, controlClass?: string) => {
  return (
    <Control
      {...props}
      className={[
        style.control,
        props.isFocused ? style.focused : '',
        props.isDisabled ? style.disabled : '',
        controlClass,
      ].join(' ')}
    >
      {props.children}
    </Control>
  );
};

const CustomMenu = (props: MenuProps<SelectOptionItem>, menuClassname?: string) => (
  <Menu {...props} className={[style.menu, menuClassname].join(' ')}>
    {props.children}
  </Menu>
);

const CustomOption = (props: OptionProps<SelectOptionItem>, optionClassName?: string) => {
  const { isSelected, isFocused, isDisabled } = props;
  const styles = [
    style.option,
    isFocused ? style['option--focused'] : '',
    isSelected ? style['option--selected'] : '',
    isDisabled ? style['option--disabled'] : '',
    optionClassName,
  ].join(' ');
  return (
    <Option {...props} className={styles}>
      <Typography className="text-truncate">{props?.data?.viewLabel ?? props.data.label}</Typography>
    </Option>
  );
};

const CustomMultiValue = (props: MultiValueProps<SelectOptionItem>) => (
  <MultiValue className={style.multiValue} {...props} />
);

const CustomPlaceholder = (props: PlaceholderProps<SelectOptionItem>) => (
  <Placeholder className={style.placeholder} {...props} />
);

const CustomMenuList = (props: MenuListProps<SelectOptionItem>, menuListClass?: string) => (
  <MenuList className={[style.menuList, menuListClass].join(' ')} {...props} />
);

const getCustomStyles = ({ menuIsOpen }: CustomStylesProps) => ({
  dropdownIndicator: (provided: object) => ({
    ...provided,
    transform: menuIsOpen ? 'rotate(180deg)' : 'none',
    transition: 'transform 0.3s ease-in-out',
    color: menuIsOpen ? '#985dec' : '#abb2ba',
    cursor: 'pointer',
    '&:hover': {
      color: '#985dec',
      backgroundColor: 'inherit',
    },
  }),
  clearIndicator: (provided: object) => ({
    ...provided,
    color: '#abb2ba',
    cursor: 'pointer',
    '&:hover': {
      color: '#985dec',
      backgroundColor: 'inherit',
    },
  }),
  multiValueRemove: (provided: object) => ({
    ...provided,
    paddingRight: '4px',
    cursor: 'pointer',
    color: '#abb2ba',
    '&:hover': {
      color: '#985dec',
      backgroundColor: 'inherit',
    },
  }),
  multiValueLabel: (provided: object) => ({
    ...provided,
    padding: '3px 8px',
  }),
  valueContainer: (provided: object) => ({
    ...provided,
    gap: '4px',
  }),
});

export const Select = forwardRef<any, SingleSelectProps>(
  (
    {
      label,
      defaultValue,
      value,
      onChange,
      isDisabled,
      errorNode,
      controlClass,
      menuListClass,
      menuIsOpen,
      menuClassname,
      optionClass,
      className,
      ...rest
    },
    ref,
  ) => {
    const [menuOpen, setMenuOpen] = useState<boolean>(menuIsOpen ?? false);

    const getCustomControl = useCallback(
      (props: ControlProps<SelectOptionItem>) => CustomControl(props, controlClass),
      [controlClass],
    );

    const getCustomMenu = useCallback(
      (props: MenuProps<SelectOptionItem>) => CustomMenu(props, menuClassname),
      [menuClassname],
    );

    const getCustomMenuList = useCallback(
      (props: MenuListProps<SelectOptionItem>) => CustomMenuList(props, menuListClass),
      [menuListClass],
    );

    const getCustomOption = useCallback(
      (props: OptionProps<SelectOptionItem>) => CustomOption(props, optionClass),
      [optionClass],
    );

    return (
      <div className={[style.select, isDisabled ? style.selectDisabled : '', className].join(' ')}>
        {label && <label className={style.label}>{label}</label>}
        <ReactSelect
          ref={ref}
          defaultValue={defaultValue}
          className={className}
          value={value}
          onChange={onChange}
          isDisabled={isDisabled}
          components={{
            Option: getCustomOption,
            Control: getCustomControl,
            Menu: getCustomMenu,
            SingleValue: CustomSingleValue,
            MultiValue: CustomMultiValue,
            Placeholder: CustomPlaceholder,
            MenuList: getCustomMenuList,
          }}
          menuIsOpen={menuIsOpen}
          onMenuOpen={() => setMenuOpen(true)}
          onMenuClose={() => setMenuOpen(false)}
          styles={getCustomStyles({ menuIsOpen: menuOpen })}
          unstyled={true}
          blurInputOnSelect
          menuPosition="fixed"
          menuPlacement="auto"
          {...rest}
        />
        {errorNode}
      </div>
    );
  },
);

export const HookSelect = (props: HookSelectProps) => {
  const { name, required, defaultValue, validate, controlClass, ...rest } = props;
  const { control } = useFormContext();

  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      rules={{ required: required && 'Required', validate }}
      control={control}
      render={({ field: { onChange, ...field }, fieldState: { error } }) => (
        <Select
          {...rest}
          {...field}
          onChange={(val) => {
            onChange(val);
            rest.onChange && rest.onChange(val);
          }}
          controlClass={[error ? style.error : '', controlClass].join(' ')}
          defaultValue={defaultValue}
          errorNode={error && <HookErrorMessage message={error.message} />}
        />
      )}
    />
  );
};
