import { useConfirmationModal } from 'features/confirmation-modal';
import { Blocker, History, Location, Transition } from 'history';
import { FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { UNSAFE_NavigationContext, useLocation, useNavigate } from 'react-router-dom';

const useBlocker = (blocker: Blocker, when = true) => {
  // The following cast is necessary because the react-router-dom team has removed
  // methods of the History interface from the the type decalration of Navigator
  // that are not currently being used by react-router-dom.
  const navigator = useContext(UNSAFE_NavigationContext).navigator as History;

  useEffect(() => {
    // Had to return undefined here because we have the "consistent-return" lint rule
    // on which requires that return statements either always or never specify values.
    if (!when) return undefined;

    const unblock = navigator.block((transition: Transition) => {
      const autoUnblockingTx = {
        ...transition,
        retry() {
          unblock();
          transition.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
};

const usePrompt = (when: boolean) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPrompt, setShowPrompt] = useState(false);
  const [lastLocation, setLastLocation] = useState<Location | null>(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  const cancelNavigation = useCallback(() => {
    setShowPrompt(false);
  }, []);

  const handleBlockedNavigation = useCallback(
    (transition: Transition) => {
      if (!confirmedNavigation && transition.location.pathname !== location.pathname) {
        setShowPrompt(true);
        setLastLocation(transition.location);
        return false;
      }
      return true;
    },
    [confirmedNavigation, location.pathname],
  );

  const confirmNavigation = useCallback(() => {
    setShowPrompt(false);
    setConfirmedNavigation(true);
  }, []);

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      navigate(lastLocation.pathname);
    }
  }, [navigate, confirmedNavigation, lastLocation]);

  useBlocker(handleBlockedNavigation, when);

  return { showPrompt, confirmNavigation, cancelNavigation };
};

type WithUnsavedChangesPromptProps = {
  when: boolean;
};

const WithUnsavedChangesPrompt: FC<PropsWithChildren<WithUnsavedChangesPromptProps>> = ({ when, children }) => {
  const { showPrompt, confirmNavigation, cancelNavigation } = usePrompt(when);
  const { openModal } = useConfirmationModal();

  useEffect(() => {
    if (showPrompt) {
      openModal({
        message: 'You have unsaved changes, are you sure you want to leave?',
        confirmButtonLabel: 'Continue',
        declineButtonLabel: 'Cancel',
        onConfirm: async () => confirmNavigation(),
        onDecline: async () => cancelNavigation(),
      });
    }
  }, [showPrompt, confirmNavigation, cancelNavigation, openModal]);

  return <>{children}</>;
};

export default WithUnsavedChangesPrompt;
