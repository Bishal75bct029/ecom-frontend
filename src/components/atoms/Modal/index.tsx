import { ReactNode } from 'react';
import { Modal as BootstrapModal, ModalProps as BootstrapModalProps } from 'react-bootstrap';

import { CloseIcon } from '@/assets/icons';
import style from './style.module.scss';

export type Size = 'sm' | 'lg';

export interface ModalProps extends BootstrapModalProps {
  size?: Size;
  scrollable?: boolean;
  show?: boolean;
  className?: string;
  header?: ReactNode;
  children?: ReactNode;
  centered?: boolean;
  onHide: () => void;
  isDialogPrompt?: boolean;
  closeButtonClass?: string;
  fillBody?: boolean;
  isBackdropNonStatic?: boolean;
  allowKeyBoard?: boolean;
}

const modalSize: Record<Size, string> = {
  sm: style.modalSizeSm,
  lg: style.modalSizeLg,
};

const Modal = ({
  children,
  className,
  centered = true,
  size = 'sm',
  scrollable,
  show,
  header,
  onHide,
  isDialogPrompt,
  closeButtonClass,
  fillBody = false,
  isBackdropNonStatic = false,
  allowKeyBoard = false,
  dialogClassName = '',
  ...rest
}: ModalProps) => (
  <BootstrapModal
    scrollable={scrollable}
    show={show}
    onHide={onHide}
    centered={centered}
    contentClassName={[
      modalSize[size],
      className,
      style.modalContent,
      isDialogPrompt && 'p-0 gap-0',
      fillBody && style.fillDialogBody,
    ].join(' ')}
    dialogClassName={[style.modalDialog, modalSize[size], dialogClassName].join(' ')}
    backdrop={isBackdropNonStatic ? undefined : 'static'}
    keyboard={allowKeyBoard}
    className="overflow-y-hidden"
    {...rest}
  >
    {!fillBody && (
      <BootstrapModal.Header className={[style.modalHeader, isDialogPrompt && style.dialogHeader].join(' ')}>
        <BootstrapModal.Title>{header}</BootstrapModal.Title>
        {!isDialogPrompt && (
          <div onClick={onHide} className={[style.closeIcon, closeButtonClass].join(' ')}>
            <CloseIcon />
          </div>
        )}
      </BootstrapModal.Header>
    )}

    {fillBody && (
      <div onClick={onHide} className={[style.closeIcon, closeButtonClass].join(' ')}>
        <CloseIcon />
      </div>
    )}

    <BootstrapModal.Body className={[style.modalBody, isDialogPrompt && style.dialogBody].join(' ')}>
      {children}
    </BootstrapModal.Body>
  </BootstrapModal>
);

export default Modal;
