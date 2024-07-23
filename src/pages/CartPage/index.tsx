import { Stack } from 'react-bootstrap';

import style from './style.module.scss';
import { Button, CheckBox, Typography } from '@/components/atoms';
import { faker } from '@faker-js/faker';

const CartPage = () => {
  return (
    <Stack direction="horizontal" className={style.cartContainer}>
      <Stack className={style.cartItemsContainer}>
        <Typography fontsStyle="large-semi-bold">Shopping Cart</Typography>
        <div className="d-flex justify-content-between mt-2">
          <Typography fontsStyle="base-semi-bold">
            <CheckBox label="Select all items" />
          </Typography>
          <Typography fontsStyle="base-semi-bold" color="primary-purple">
            Price
          </Typography>
        </div>
        <hr className="p-0 mt-0" />
        {[...Array(3)].map((i) => (
          <div key={i}>
            <Stack direction="horizontal" className={style.cartItem}>
              <div className={style.productDetailContainer}>
                <CheckBox />
                <div className="d-flex align-items-start gap-3">
                  <div>
                    <div className={style.imageContainer}>
                      <img src={faker.image.url()} />
                    </div>
                  </div>
                  <div>
                    <Typography fontsStyle="base-semi-bold" className={style.productName}>
                      Lorem ipsum dolor sit Lorem ipsum do lorem sdgsdg sdgsg sdgsdg sdgsdg dfhdfh sdsd sdghsdh
                      sdgsdhhsdhsdhsdhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhh
                    </Typography>
                  </div>
                </div>
              </div>
              <Stack direction="horizontal" className="align-items-start gap-4">
                <div className="d-flex align-items-center">
                  <Typography fontsStyle="base-semi-bold" className={[style.quantityLabel, 'me-3'].join(' ')}>
                    Quantity
                  </Typography>
                  <Button size="small" variant="tertiary">
                    -
                  </Button>
                  <Typography className="d-flex justify-content-center" style={{ width: '40px' }}>
                    {10}
                  </Typography>
                  <Button size="small" variant="tertiary">
                    +
                  </Button>
                </div>
                <Typography fontsStyle="large-bold" color="primary-purple" className={style.priceContainer}>
                  Rs. 200
                </Typography>
              </Stack>
            </Stack>
            <hr className="p-0" />
          </div>
        ))}
      </Stack>
      <div className={style.checkoutContainer}>
        <Typography fontsStyle="large-semi-bold">Order Summary</Typography>
        <hr className="p-0 mt-0" />
        <div className="mb-3">
          <Typography className="d-flex justify-content-between">
            <span>Subtotal (1 item)</span>
            <Typography fontsStyle="base-bold" color="primary-purple">
              Rs. 100
            </Typography>
          </Typography>
        </div>
        <div className="d-flex justify-content-center">
          <Button>Proceed to Checkout</Button>
        </div>
      </div>
    </Stack>
  );
};

export default CartPage;
