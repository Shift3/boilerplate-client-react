/* eslint-disable no-alert */
import { FC, useEffect, useState } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GenericTable } from 'components/genericTable';
import { TableHeader } from 'components/genericTable/types';
import { useAppDispatch, useAppSelector } from 'core/redux';
import { fetchAll } from 'redux/agency/thunks';
import { selectAgencies } from 'redux/agency/selectors';

type AgencyTableItem = {
  // eslint-disable-next-line react/no-unused-prop-types
  id: number;
  // eslint-disable-next-line react/no-unused-prop-types
  name: string;
  actions: {
    icon: IconProp;
    onClick: () => void;
  }[];
};

const customRenderers = {
  actions: ({ actions }: AgencyTableItem) => (
    <>
      {actions.map((action, index) => (
        <span
          role='button'
          tabIndex={0}
          className='px-3 py-1'
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          onClick={action.onClick}
          onKeyPress={action.onClick}
        >
          <FontAwesomeIcon icon={action.icon} />
        </span>
      ))}
    </>
  ),
};

export const AgencyListView: FC = () => {
  const dispatch = useAppDispatch();
  const agencies = useAppSelector(selectAgencies);
  const [items, setItems] = useState<AgencyTableItem[]>([]);

  const headers: TableHeader<AgencyTableItem>[] = [
    { key: 'name', label: 'AGENCY NAME' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  useEffect(() => {
    const tableItems: AgencyTableItem[] = agencies.map((agency) => ({
      id: agency.id,
      name: agency.agencyName,
      actions: [
        { icon: 'edit', onClick: () => alert(`Edit ${agency.agencyName}`) },
        { icon: 'trash-alt', onClick: () => alert(`Delete ${agency.agencyName}`) },
      ],
    }));

    setItems(tableItems);
  }, [agencies]);

  return <GenericTable<AgencyTableItem> headers={headers} items={items} customRenderers={customRenderers} />;
};
