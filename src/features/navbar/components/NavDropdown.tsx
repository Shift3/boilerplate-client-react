import { FC, useState } from 'react';
import { NavLinkConfig } from 'features/navbar';
import { CustomNavLink } from 'features/navbar/components/CustomNavLink';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  title: string;
  children: NavLinkConfig[];
  isOpenByDefault: boolean;
  closeVerticalNav?: () => void;
};

const FilterCategory = styled.div`
  display: block;
  &:not(:last-of-type) {
    border-bottom: 1px solid ${props => props.theme.buttons.defaultBackgroundColor};
  }

  & > .category {
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${props => props.theme.pages.p};
    transition: all 0.15s ease;

    &:hover {
      color: ${props => props.theme.textColor};
    }

    span {
      flex: 1;

      &.active {
        color: ${props => props.theme.textColor};
        font-weight: 600;
      }
    }

    svg {
      transition: all 0.15s ease;
    }
  }

  & > .content {
    visibility: hidden;
    max-height: 0;
    padding: 0 1rem;
    transition: all 0.15s ease;
    overflow: hidden;
    background: ${props => props.theme.backgroundColor};

    label {
      color: ${props => props.theme.textColor};
      font-weight: normal;
      font-size: 0.9rem;
    }
  }

  &.open {
    & > .category {
      color: ${props => props.theme.textColor};

      svg {
        transform: rotateZ(180deg);
      }
    }

    & > .content {
      visibility: visible;
      max-height: 250px;
      padding: 1rem;
    }
  }
`;

type NewProps = {
  linkMap: { [key: string]: NavLinkConfig[] };
  initiallyOpenedKey: string;
  closeVerticalNav?: () => void;
};

export const NavDropdown: FC<NewProps> = ({ linkMap, initiallyOpenedKey, closeVerticalNav }) => {
  const [openFilter, setOpenFilter] = useState<string | null>(initiallyOpenedKey);
  const keys = Object.keys(linkMap);

  console.log('NavDropdown');

  const toggleCategory = (keyName: string) => {
    if (openFilter === keyName) setOpenFilter(null);
    else setOpenFilter(keyName);
  };

  return (
    <>
      {keys.map(key => (
        <FilterCategory key={key} className={openFilter === key ? 'open' : ''}>
          <div role='button' tabIndex={-1} className='category' onClick={() => toggleCategory(key)}>
            <span>{key}</span>
            <FontAwesomeIcon icon='chevron-down' />
          </div>

          <div className='content'>
            {linkMap[key].map(link => (
              <CustomNavLink handleSamePathNavigate={closeVerticalNav} key={link.id} link={link} />
            ))}
          </div>
        </FilterCategory>
      ))}
    </>
  );
};

// export const NavDropdown: FC<Props> = ({ title, children, isOpenByDefault, closeVerticalNav }) => {
//   return (
//     <div>
//       <div>{title}</div>
//       {isOpenByDefault
//         ? children.map(link => <CustomNavLink handleSamePathNavigate={closeVerticalNav} key={link.id} link={link} />)
//         : null}
//     </div>
//   );
// };
