import { FC, useMemo, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Button, Modal, Typography } from '@/components/atoms';
import style from './style.module.scss';
import { useGetUserAddressesQuery } from '@/store/features/user';
import { ModalProps } from '@/components/atoms/Modal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { UserAddress } from '@/store/features/user/types';
import { setCartState } from '@/store/features/cart';

const ChangeAddressModal: FC<Pick<ModalProps, 'show' | 'onHide'>> = ({ show, onHide }) => {
  const dispatch = useAppDispatch();

  const selectedShippingAddress = useAppSelector((state) => state.cart.selectedShippingAddress);

  const [address, setAddress] = useState<UserAddress | undefined>(selectedShippingAddress);

  const { data: userAddresses } = useGetUserAddressesQuery();

  const handleCardClick = (location: UserAddress) => {
    setAddress(location);
  };

  const handleOnConfirm = () => {
    if (address) {
      dispatch(setCartState({ selectedShippingAddress: address }));
    }
    onHide();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const add = useMemo(() => setAddress(selectedShippingAddress), [selectedShippingAddress]);

  return (
    <Modal
      size="lg"
      header={<Typography className="mb-2">Change Address</Typography>}
      footer={
        <div className="d-flex mt-3 gap-2">
          <Button variant="plain" onClick={onHide}>
            Cancel
          </Button>
          <Button onClick={handleOnConfirm}>Confirm</Button>
        </div>
      }
      show={show}
      onHide={onHide}
    >
      <div className={style.changeAddressCardsContainer}>
        {userAddresses?.map((item, i) => (
          <Card
            className={['p-3', style.addressCard, address?.id === item.id ? style.selected : ''].join(' ')}
            key={i}
            onClick={() => handleCardClick(item)}
          >
            <div className="d-flex gap-3">
              <Typography component={'span'} fontsStyle="base-semi-bold" className="whitespace-nowrap">
                Contant:
              </Typography>
              <Typography component={'span'} className="whitespace-nowrap">
                {item.contact}
              </Typography>
            </div>
            <div className="d-flex gap-3">
              <Typography component={'span'} fontsStyle="base-semi-bold" className="whitespace-nowrap">
                Address:
              </Typography>
              <Typography component={'span'} className={style.addressText}>
                {item.name}
              </Typography>
            </div>
          </Card>
        ))}
      </div>
    </Modal>
  );
};

export default ChangeAddressModal;
