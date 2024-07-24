import { forwardRef } from 'react';
import { Carousel, CarouselProps } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface ImageCarouselProps extends Partial<CarouselProps> {
  size?: number | string;
  images: string[];
}

const ImageCarousel = forwardRef<Carousel, ImageCarouselProps>(({ size = '500px', images, ...rest }, ref) => {
  return (
    <>
      <div style={{ maxWidth: size }}>
        <Carousel
          className="customCarousal"
          showIndicators={false}
          autoPlay
          dynamicHeight
          infiniteLoop
          stopOnHover
          ref={ref}
          {...rest}
        >
          {images.map((image, i) => (
            <img key={i} src={image} alt="image" style={{ borderRadius: '6px' }} />
          ))}
        </Carousel>
      </div>
    </>
  );
});

export default ImageCarousel;
