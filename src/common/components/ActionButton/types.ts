import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { colors } from 'utils/styleValues';

export type ActionButtonProps = {
  icon: IconProp;
  tooltipText: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  show?: boolean;
  primaryColor: keyof(typeof colors);
};
