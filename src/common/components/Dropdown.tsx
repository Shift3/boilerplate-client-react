import { FC } from 'react';
import { NavLinkConfig } from 'features/navbar';
import { CustomNavLink } from 'features/navbar/components/CustomNavLink';

type Props = {
  title: string;
  children: NavLinkConfig[];
  isOpenByDefault: boolean;
  closeVerticalNav?: () => void;
};

export const Dropdown: FC<Props> = ({ title, children, isOpenByDefault, closeVerticalNav }) => {
  return (
    <div>
      <div>{title}</div>
      {isOpenByDefault
        ? children.map(link => <CustomNavLink handleSamePathNavigate={closeVerticalNav} key={link.id} link={link} />)
        : null}
    </div>
  );
};
