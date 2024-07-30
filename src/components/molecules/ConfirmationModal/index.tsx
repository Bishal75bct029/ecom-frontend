import { FC, ReactNode } from 'react';
import { Stack } from 'react-bootstrap';

import { ModalProps } from '@/components/atoms/Modal';
import { ButtonTypeGroup } from '@/components/atoms/Button';
import { Button, Modal, Typography } from '@/components/atoms';

import style from './style.module.scss';

interface IConfirmationModal extends ModalProps {
  title: ReactNode;
  message: string;
  confirmLabel?: string;
  onConfirm?: () => void;
  isConfirming?: boolean;
  cancelLabel?: string;
  oncancel?: () => void;
  confirmVariant?: ButtonTypeGroup;
}

const ConfirmationModal: FC<IConfirmationModal> = ({
  title,
  message,
  confirmLabel,
  onConfirm,
  isConfirming = false,
  cancelLabel = 'Cancel',
  oncancel,
  confirmVariant = 'secondary-red',
  ...rest
}) => {
  return (
    <Modal
      isDialogPrompt
      header={
        <Typography className="d-flex align-items-center" fontsStyle="large-semi-bold">
          {title}
        </Typography>
      }
      {...rest}
    >
      <Typography>{message}</Typography>

      <Stack
        direction="horizontal"
        className={['align-items-center justify-content-end', style.buttonContainer].join(' ')}
      >
        <Button variant="plain" onClick={oncancel ?? rest.onHide}>
          {cancelLabel}
        </Button>

        <Button
          onClick={() => {
            onConfirm?.();
            rest.onHide();
          }}
          variant={confirmVariant}
          disabled={isConfirming}
        >
          {confirmLabel || 'Confirm'}
        </Button>
      </Stack>
    </Modal>
  );
};

export default ConfirmationModal;
