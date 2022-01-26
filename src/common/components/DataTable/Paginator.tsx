import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

type Props = {
  page: number;
  count: number;
  pageCount: number;
  pageSize: number;
  pageSizeOptions: number[];
  hasNext: boolean;
  hasPrev: boolean;
  onNextClick: () => void;
  onPrevClick: () => void;
  onPageSizeChange: (size: number) => void;
};

export const Paginator: FC<Props> = ({
  page,
  count,
  pageCount,
  pageSize,
  pageSizeOptions,
  hasNext,
  hasPrev,
  onNextClick,
  onPrevClick,
  onPageSizeChange,
}) => {
  const rangeStart = pageSize * (page - 1) + 1;
  const rangeEnd = page < pageCount ? pageSize * page : count;

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <Form.Select
              aria-label='Page size'
              size='sm'
              value={pageSize}
              onChange={e => onPageSizeChange(Number(e.target.value))}
              style={{ display: 'inline-block', width: '80px' }}
            >
              {pageSizeOptions.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </Form.Select>{' '}
            <span>Items per page</span>
          </Col>
          <Col className='d-flex justify-content-end align-items-center'>
            <span>
              {rangeStart} - {rangeEnd} of {count}
            </span>
            <Button variant='link' disabled={!hasPrev} onClick={onPrevClick}>
              <FontAwesomeIcon icon={faChevronLeft} />{' '}
            </Button>
            <Button variant='link' disabled={!hasNext} onClick={onNextClick}>
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
