import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetFarmByIdQuery, useGetFarmHistoryQuery, useUpdateFarmMutation } from 'common/api/farmApi';
import { isFetchBaseQueryError } from 'common/api/handleApiError';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { isObject } from 'common/error/utilities';
import { PaginatedResult, ServerValidationErrors, User } from 'common/models';
import * as notificationService from 'common/services/notification';
import { Card, Modal } from 'react-bootstrap';
import { PageCrumb, PageHeader, SmallContainer } from 'common/styles/page';
import { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FarmDetailForm, FormData } from '../components/FarmDetailForm';
import { useAuth } from 'features/auth/hooks';
import { ChangeLog } from 'common/components/ChangeLog/ChangeLog';
import { useInfiniteLoading } from 'common/hooks/useInfiniteLoading';
import { QueryParamsBuilder } from 'common/api/queryParamsBuilder';
import { HistoricalRecord } from 'common/models/historicalRecord';
import { ChangeListGroup } from 'common/components/ChangeLog/ChangeListGroup';
import { LoadingButton } from 'common/components/LoadingButton';
import { useModal } from 'react-modal-hook';
import { DimmableContent } from 'common/styles/utilities';

export type RouteParams = {
  id: string;
};

export const UpdateFarmView: FC = () => {
  const { id } = useParams<RouteParams>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [updateFarm] = useUpdateFarmMutation();
  const { data: farm, isLoading: isLoadingFarm, isFetching, error } = useGetFarmByIdQuery(id!);

  const pageSize = 5;
  const queryParams = new QueryParamsBuilder().setPaginationParams(1, pageSize).build();
  const url = `/farms/${id}/history/?${queryParams}`;
  const {
    loadedData: farmHistory,
    error: farmHistoryError,
    isFetching: isFetchingHistory,
    totalCount,
    hasMore,
    fetchMore,
  } = useInfiniteLoading<HistoricalRecord<User>, PaginatedResult<HistoricalRecord<User>>>(url, useGetFarmHistoryQuery, {
    skip: user?.role !== 'ADMIN',
  });

  const [formValidationErrors, setFormValidationErrors] = useState<ServerValidationErrors<FormData> | null>(null);

  const [showModal, hideModal] = useModal(
    ({ in: open, onExited }) => {
      return (
        <Modal show={open} onHide={hideModal} onExited={onExited} centered contentClassName='changelog-modal-content'>
          <Modal.Header closeButton>
            <Modal.Title>Changes</Modal.Title>
          </Modal.Header>
          <Modal.Body className='changelog-modal-body'>
            <DimmableContent dim={isFetchingHistory}>
              <ChangeListGroup changeList={farmHistory} />
            </DimmableContent>
          </Modal.Body>
          <Modal.Footer className='d-flex justify-content-center changelog-modal-footer'>
            {hasMore && (
              <LoadingButton
                className='action-shadow'
                loading={isFetchingHistory}
                variant='primary'
                onClick={() => fetchMore()}
              >
                Load More
              </LoadingButton>
            )}
          </Modal.Footer>
        </Modal>
      );
    },
    [farmHistory, isFetchingHistory],
  );

  useEffect(() => {
    if (error) {
      notificationService.showErrorMessage('Unable to load Farm. Returning to Farm list.');
      navigate('/farms', { replace: true });
    }
    if (farmHistoryError) {
      notificationService.showErrorMessage("Unable to load the Farm's change history.");
    }
  }, [error, navigate, farmHistoryError]);

  const handleShowAllChanges = () => {
    showModal();
  };

  const handleFormCancel = () => {
    navigate(-1);
  };

  const handleFormSubmit = async (data: FormData) => {
    const updateRequest = { id: Number(id), ...data };
    try {
      await updateFarm(updateRequest).unwrap();
      notificationService.showSuccessMessage('Farm updated.');
      navigate('/farms');
    } catch (error) {
      notificationService.showErrorMessage('Unable to update Farm.');
      if (error && isFetchBaseQueryError(error)) {
        if (isObject(error.data)) {
          setFormValidationErrors(error.data);
        }
      } else {
        throw error;
      }
    }
  };

  return (
    <SmallContainer>
      <PageCrumb>
        <Link to='/farms'>
          <FontAwesomeIcon icon={['fas', 'chevron-left']} /> Back to Farm List
        </Link>
      </PageCrumb>

      <PageHeader>
        <div>
          <h1>Edit Farm</h1>
          <p className='text-muted'>Update this Farms details here.</p>
        </div>
      </PageHeader>

      <Card>
        <Card.Body>
          <WithLoadingOverlay isInitialLoad={isLoadingFarm && isFetching} isLoading={isLoadingFarm}>
            {!isLoadingFarm ? (
              <FarmDetailForm
                defaultValues={farm}
                submitButtonLabel='Save'
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
                serverValidationErrors={formValidationErrors}
              />
            ) : null}
          </WithLoadingOverlay>
        </Card.Body>
      </Card>
      <div className='mt-3'>
        {farmHistory && totalCount ? (
          <ChangeLog
            changeList={farmHistory}
            previewSize={pageSize}
            totalChanges={totalCount}
            handleShowAllChanges={handleShowAllChanges}
          />
        ) : null}
      </div>
    </SmallContainer>
  );
};
