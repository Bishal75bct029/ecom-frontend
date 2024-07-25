import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, HookForm, HookFormProvider, HookSelect, HookTextInput, Modal, Typography } from '@/components/atoms';
import { ModalProps } from '@/components/atoms/Modal';
import { UserAddress } from '@/store/features/user/types';
import { toastSuccess, validatePhoneNumber } from '@/utils';
import { usePostUserAddressesMutation, usePutUserAddressesMutation } from '@/store/features/user';
import { useAppSelector } from '@/store/hooks';
import { SelectOptionItem } from '@/components/atoms/Select';
import { useDispatch } from 'react-redux';
import { setCartState } from '@/store/features/cart';

interface AddAddressModalProps extends Pick<ModalProps, 'show' | 'onHide'> {
  isEditMode?: boolean;
  id?: string;
}

const ADDRESS_TYPES = [
  { label: 'BILLING', value: 'BILLING' },
  { label: 'SHIPPING', value: 'SHIPPING' },
];

const AddAddressModalView: FC<AddAddressModalProps> = ({ show, onHide, isEditMode }) => {
  const dispatch = useDispatch();

  const selectedShippingAddress = useAppSelector((state) => state.cart.selectedShippingAddress);

  const { handleSubmit } = useFormContext<Omit<UserAddress, 'id' | 'type'> & { type: SelectOptionItem }>();

  const [postUserAddress, { isLoading }] = usePostUserAddressesMutation();
  const [putUserAddress, { isLoading: isUpdating }] = usePutUserAddressesMutation();

  const onSubmit = (values: Omit<UserAddress, 'id' | 'type'> & { type: SelectOptionItem }) => {
    const payload = { ...values, type: values.type.value };
    if (isEditMode) {
      if (!selectedShippingAddress) return;
      putUserAddress({ id: selectedShippingAddress.id, ...payload })
        .unwrap()
        .then(() => {
          dispatch(setCartState({ selectedShippingAddress: { id: selectedShippingAddress.id, ...payload } }));
          toastSuccess('Address edited successfully.');
          onHide();
        });
    } else {
      postUserAddress(payload)
        .unwrap()
        .then(() => {
          toastSuccess('Address added successfully.');
          onHide();
        });
    }
  };

  return (
    <Modal
      header={<Typography className="mb-2">{isEditMode ? 'Edit' : 'Add New'} Address</Typography>}
      show={show}
      onHide={onHide}
    >
      <HookForm onSubmit={handleSubmit(onSubmit)}>
        <HookTextInput name="name" label="Address" placeholder="Enter address" className="mb-3" required autoFocus />
        <HookSelect
          name="type"
          label="Address Type"
          placeholder="Select address type"
          options={ADDRESS_TYPES}
          className="mb-3"
          required
        />
        <HookTextInput
          name="contact"
          label="Contact"
          placeholder="Enter contact"
          validate={validatePhoneNumber}
          required
        />
        <div className="d-flex justify-content-end mt-4 gap-2">
          <Button variant="plain" onClick={onHide} disabled={isLoading || isUpdating}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading || isUpdating}>
            Confirm
          </Button>
        </div>
      </HookForm>
    </Modal>
  );
};

const AddAddressModal: FC<AddAddressModalProps> = ({ isEditMode, ...props }) => {
  const selectedShippingAddress = useAppSelector((state) => state.cart.selectedShippingAddress);

  const defaultValues = {
    name: selectedShippingAddress?.name,
    contact: selectedShippingAddress?.contact,
    type: ADDRESS_TYPES.find((type) => type.value === selectedShippingAddress?.type),
  };

  return (
    <HookFormProvider defaultValues={isEditMode ? defaultValues : {}}>
      <AddAddressModalView {...props} isEditMode={isEditMode} />
    </HookFormProvider>
  );
};

export default AddAddressModal;
