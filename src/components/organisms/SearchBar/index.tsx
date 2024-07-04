import { FC, forwardRef, useRef } from 'react';
import { FormControl, FormControlProps, FormGroup } from 'react-bootstrap';

import style from './style.module.scss';
import { SearchIcon } from '@/assets/icons';

interface SeachBarProps extends FormControlProps {
  containerClass?: string;
}

const SearchBar: FC<SeachBarProps> = forwardRef<HTMLInputElement, SeachBarProps>(
  ({ name, containerClass, className, autoComplete, placeholder, ...rest }, ref) => {
    const inputRef = useRef<any>(null);

    return (
      <FormGroup className={[style.searchBarContainer, containerClass].join(' ')}>
        <FormControl
          id={name}
          name={name}
          ref={(node: HTMLInputElement) => {
            inputRef.current = node;
            if (!ref) return;
            if (typeof ref === 'function') {
              return ref(node);
            }
            ref.current = node;
          }}
          placeholder={placeholder || 'What are you looking for?'}
          className={[style.searchBarControl, className].join(' ')}
          autoComplete={autoComplete || 'off'}
          {...rest}
        />
        <div className={style.endIconContainer} onClick={() => inputRef.current.focus()}>
          <SearchIcon />
        </div>
      </FormGroup>
    );
  },
);

export default SearchBar;
