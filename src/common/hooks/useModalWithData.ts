import { DependencyList, useCallback, useMemo, useState } from 'react';
import { ModalType, useModal } from 'react-modal-hook';

declare type HideModal = () => void;

export const useModalWithData = <T>(
  modalFactory: (data: T) => ModalType,
  deps: DependencyList,
): [(data: T) => void, HideModal] => {
  const [modalData, setModalData] = useState<T>({} as T);
  // eslint-disable-next-line
  const modalComponent = useMemo(() => modalFactory(modalData), [...deps, modalData, modalFactory]);
  const [_showModal, hideModal] = useModal(modalComponent, [...deps, modalData]);

  const showModal = useCallback(
    (data: T) => {
      setModalData(data);
      _showModal();
    },
    [setModalData, _showModal],
  );

  return [showModal, hideModal];
};
