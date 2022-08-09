import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CustomSelect } from 'common/components/CustomSelect';
import { FC, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

type Props = {
  page: number;
  pageSize: number;
  count: number;
  pageCount: number;
  pageSizeOptions: number[];
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPreviousPageClick: () => void;
  onNextPageClick: () => void;
  onPageSizeChange: (size: number) => void;
};

type PageSizeOption = {
  label: string;
  value: string;
};

export const Paginator: FC<Props> = ({
  page,
  pageSize,
  count,
  pageCount,
  pageSizeOptions,
  hasPreviousPage,
  hasNextPage,
  onPreviousPageClick,
  onNextPageClick,
  onPageSizeChange,
}) => {
  const rangeStart = pageSize * (page - 1) + 1;
  const rangeEnd = page < pageCount ? pageSize * page : count;
  const defaultOption = { label: pageSize.toString(), value: pageSize.toString() };

  const __pageSizeOptions = useMemo(
    () =>
      pageSizeOptions.map(option => ({
        label: option.toString(),
        value: option.toString(),
      })),
    [pageSizeOptions],
  );

  return (
    <div className='table-paginator'>
      <Row>
        {/* Page size selector */}
        <Col className='d-flex align-items-center'>
          <div style={{ display: 'inline-block', width: '100px', marginRight: '10px' }}>
            <CustomSelect<PageSizeOption>
              placeholder=''
              options={__pageSizeOptions}
              defaultValue={defaultOption}
              onChange={option => onPageSizeChange(Number(option.value))}
            />
          </div>
          <span className='text-muted'>items per page</span>
        </Col>
        {/* Display the range of results currently showing */}
        <Col className='d-flex justify-content-end align-items-center'>
          <span className='text-muted' style={{ marginRight: '10px' }}>
            {rangeStart} - {rangeEnd} of {count}
          </span>
          <Button variant='link' disabled={!hasPreviousPage} onClick={onPreviousPageClick}>
            <FontAwesomeIcon icon={faChevronLeft} />{' '}
          </Button>
          <Button variant='link' disabled={!hasNextPage} onClick={onNextPageClick}>
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </Col>
      </Row>
    </div>
  );
};
