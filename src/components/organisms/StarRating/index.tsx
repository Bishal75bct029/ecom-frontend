import { FC, Fragment, MouseEvent, PointerEvent, useMemo, useState } from 'react';
import style from './style.module.scss';
import { StarIcon, StarIconProps } from './StarIcon';

interface StartRatingProps extends StarIconProps {
  className?: string;
  readonly?: boolean;
  initialValue?: number;
  onClick?: (value: number, index: number, event?: MouseEvent<HTMLSpanElement>) => void;
  onPointerMove?: (value: number, index: number, event: PointerEvent<HTMLSpanElement>) => void;
  onPointerEnter?: (event: PointerEvent<HTMLSpanElement>) => void;
  onPointerLeave?: (event: PointerEvent<HTMLSpanElement>) => void;
}

const StarRating: FC<StartRatingProps> = ({
  className,
  readonly,
  onPointerMove,
  onClick,
  onPointerEnter,
  onPointerLeave,
  initialValue = 0,
  size = 40,
}) => {
  const [ratingValue, setRatingValue] = useState<number | null>(null);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number>(0);

  const localRating = useMemo(() => (initialValue > 5 ? 0 : initialValue * 20), [initialValue]);

  const valuePercentage = useMemo(() => {
    return (hoverValue && hoverValue) || (ratingValue && ratingValue) || localRating;
  }, [hoverValue, ratingValue, localRating]);

  const handlePointerMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (readonly) return;
    const { clientX, currentTarget } = event;
    const { left, width } = currentTarget.children[0].getBoundingClientRect();

    const positionX = clientX - left;

    let currentValue = 5;
    const iconWidth = Math.round(width / 5);

    for (let i = 0; i <= 5; i++) {
      if (positionX <= iconWidth * i) {
        if (i === 0 && positionX < iconWidth) currentValue = 0;
        else currentValue = i;
        break;
      }
    }

    const index = currentValue - 1;

    if (currentValue > 0) {
      setHoverValue((currentValue * 100) / 5);
      setHoverIndex(index);
      onPointerMove && hoverValue && onPointerMove(hoverValue / 20, index, event);
    }
  };

  const handlePointerEnter = (event: PointerEvent<HTMLSpanElement>) => {
    if (readonly) return;
    handlePointerMove(event);
    onPointerEnter && onPointerEnter(event);
  };

  const handleClick = (event?: MouseEvent<HTMLSpanElement>) => {
    if (readonly) return;
    if (hoverValue) {
      setRatingValue(hoverValue);
      onClick && onClick(hoverValue / 20, hoverIndex, event);
    }
  };

  const handlePointerLeave = (event: PointerEvent<HTMLSpanElement>) => {
    if (readonly) return;
    setHoverIndex(0);
    setHoverValue(null);
    onPointerLeave && onPointerLeave(event);
  };

  return (
    <span className={style.wrapper}>
      <span
        className={[style.container, readonly ? '' : 'cursor-pointer', className].join(' ')}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        aria-hidden="true"
      >
        {/* empty icons */}
        <span className={style.emptyIcons}>
          {[...Array(5)].map((_, index) => (
            <Fragment key={index}>
              <StarIcon size={size} />
            </Fragment>
          ))}
        </span>

        {/* filled icons cover empty icons */}
        <span className={style.filledIcons} style={{ width: `${valuePercentage}%` }}>
          {[...Array(5)].map((_, index) => (
            <Fragment key={index}>
              <StarIcon size={size} />
            </Fragment>
          ))}
        </span>
      </span>
    </span>
  );
};

export default StarRating;
