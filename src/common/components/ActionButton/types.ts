import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type ActionButtonProps = {
  icon: IconProp;
  tooltipText: string;
  onClick: () => void;
};
