import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleApiError, isFetchBaseQueryError } from 'common/api/handleApiError';
import { useDeleteUserMutation, useForgotPasswordMutation, useResendActivationEmailMutation } from 'common/api/userApi';
import { ResponsiveColumn } from 'common/components/DataTable';
import { SimpleConfirmModal } from 'common/components/SimpleConfirmModal';
import { useModalWithData } from 'common/hooks/useModalWithData';
import { Image, Role, RoleType, User } from 'common/models';
import * as notificationService from 'common/services/notification';
import { ActionButton, ActionButtonProps, TableActions } from 'common/styles/button';
import { SubtleBadge } from 'common/styles/utilities';
import { UserProfilePicture } from 'features/navbar/components/UserProfilePicture';
import { useRbac } from 'features/rbac';
import { useMemo } from 'react';
import { Button } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';

export type UserTableItem = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  activatedAt: Date | ActionButtonProps;
  role: RoleType;
  profilePicture: Image | null;
  actions: ActionButtonProps[];
};

export const useUserTableData = (users: User[] = []) => {
  const { userHasPermission } = useRbac();
  const { t, i18n } = useTranslation(['translation', 'common']);

  const [deleteUser] = useDeleteUserMutation();
  const [showDeleteModal, hideDeleteModal] = useModalWithData<User>(
    user =>
      ({ in: open, onExited }) => {
        const onConfirm = async () => {
          await deleteUser(user.id);
          notificationService.showSuccessMessage(t('userTable.userDeleted'));
          hideDeleteModal();
        };

        return (
          <SimpleConfirmModal
            title={t('userTable.deleteUser')}
            show={open}
            onCancel={hideDeleteModal}
            onConfirm={onConfirm}
            confirmLabel={t('delete', { ns: 'common' })!}
            confirmIcon='trash-alt'
            confirmVariant='danger'
            onExited={onExited}
            body={
              <>
                <p className='m-0'>
                  {t('userTable.areYouSureDelete')}{' '}
                  <span className='text-danger'>
                    <Trans ns='common' i18nKey='actionCannotBeUndone'>
                      Note that this action <strong>cannot</strong> be undone.
                    </Trans>
                  </span>
                </p>

                <div className='mt-3 d-flex align-items-center'>
                  <UserProfilePicture user={user} size='xs' radius={32} />
                  <div>
                    {user.firstName} {user.lastName}
                    <div className='text-muted'>{user.email}</div>
                  </div>
                </div>
              </>
            }
          />
        );
      },
    [i18n.language, t],
  );

  const [resendActivationEmail] = useResendActivationEmailMutation();
  const [showResendActivationModal, hideResendActivationModal] = useModalWithData<User>(
    user =>
      ({ in: open, onExited }) => {
        const onConfirm = async () => {
          await resendActivationEmail({ email: user.email });
          notificationService.showSuccessMessage(t('userTable.activationEmailSent'));
          hideResendActivationModal();
        };

        return (
          <SimpleConfirmModal
            title={t('userTable.resendActivationEmail')}
            show={open}
            onCancel={hideResendActivationModal}
            onConfirm={onConfirm}
            confirmLabel={t('userTable.sendEmail')!}
            confirmIcon='envelope'
            onExited={onExited}
            body={
              <p className='m-0'>
                <Trans i18nKey='userTable.wouldYouLikeToResendActivationEmail' values={{ user: user.email }}>
                  Would you like to resend an activation email to <strong>{user.email}</strong>?
                </Trans>{' '}
              </p>
            }
          />
        );
      },
    [i18n.language, t],
  );

  const [sendForgotPasswordEmail] = useForgotPasswordMutation();
  const [showForgotPasswordModal, hideForgotPasswordModal] = useModalWithData<User>(
    user =>
      ({ in: open, onExited }) => {
        const onConfirm = async () => {
          try {
            await sendForgotPasswordEmail({ email: user.email });
          } catch (e) {
            if (isFetchBaseQueryError(e)) {
              handleApiError(e);
            } else {
              throw e;
            }
          } finally {
            hideForgotPasswordModal();
          }
          notificationService.showSuccessMessage(t('userTable.passwordResetEmailSent'));
        };

        return (
          <SimpleConfirmModal
            title={t('userTable.sendResetPasswordEmail')}
            show={open}
            onCancel={hideForgotPasswordModal}
            onConfirm={onConfirm}
            confirmLabel={t('userTable.sendEmail')!}
            confirmIcon='envelope'
            onExited={onExited}
            body={
              <p className='m-0'>
                <Trans i18nKey='userTable.wouldYouLikeToSendActivationEmail' values={{ user: user.email }}>
                  Would you like to send an activation email to <strong>{user.email}</strong>?
                </Trans>{' '}
              </p>
            }
          />
        );
      },
    [t],
  );

  const roleVariant = (role: RoleType) => {
    if (!role) return '';

    return {
      [Role.ADMIN]: 'danger',
      [Role.USER]: 'secondary',
      [Role.EDITOR]: 'info',
    }[role];
  };

  // Set up columns and headers
  const columns: ResponsiveColumn<UserTableItem>[] = useMemo(
    () => [
      {
        accessor: 'lastName',
        Header: t('name', { ns: 'common' })!,
        Cell: ({ row }) => (
          <div className='d-flex d-row align-items-center mr-3'>
            <div className='me-2'>
              <UserProfilePicture
                user={{ profilePicture: row.original.profilePicture } as User}
                size='xs'
                radius={32}
              />
            </div>

            <div className='d-flex flex-column'>
              <span>
                {row.original.firstName}&nbsp;
                {row.original.lastName}
              </span>
              <small className='text-muted'>{row.original.email}</small>
            </div>
          </div>
        ),
      },
      {
        accessor: 'role',
        Header: t('role', { ns: 'common' })!,
        Cell: ({ value: role }) => (
          <SubtleBadge pill variant={roleVariant(role)}>
            {t(role.toLocaleLowerCase(), { ns: 'common' })}
          </SubtleBadge>
        ),
      },
      {
        accessor: 'activatedAt',
        Header: t('activatedDate', { ns: 'common' })!,
        responsive: 'md',
        Cell: ({ value: activatedAt }) => (
          <>
            {activatedAt instanceof Date ? (
              <time dateTime={activatedAt.toISOString()}>
                {new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(activatedAt)}
              </time>
            ) : (
              <>
                <ActionButton {...activatedAt}>{activatedAt.text}</ActionButton>
              </>
            )}
          </>
        ),
      },
      {
        accessor: 'actions',
        Header: '',
        Cell: ({ value: actions }) => (
          <>
            {actions.filter(action => action.show).length > 0 ? (
              <TableActions>
                <Button variant='link' onClick={e => e.stopPropagation()}>
                  <FontAwesomeIcon icon={['fas', 'ellipsis-h']} size='xs' />
                </Button>
                <div>
                  {actions.map(action => (
                    <ActionButton key={action.text} {...action} />
                  ))}
                </div>
              </TableActions>
            ) : null}
          </>
        ),
        disableSortBy: true,
      },
    ],
    [t],
  );

  // Transform User objects into the data format expected by the table.
  const data: UserTableItem[] = useMemo(
    () =>
      users.map(user => ({
        id: user.id,
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        activatedAt: user.activatedAt
          ? new Date(user.activatedAt)
          : {
              text: t('userTable.resendActivationEmail'),
              onClick: e => {
                e.stopPropagation();
                showResendActivationModal(user);
              },
              show: userHasPermission({ permission: 'user:resend-activation-email', data: user }),
            },
        actions: [
          {
            text: t('userTable.resetPassword'),
            onClick: e => {
              e.stopPropagation();
              showForgotPasswordModal(user);
            },
            show: userHasPermission({ permission: 'user:send-reset-password-email', data: user }),
          },
          {
            text: t('delete', { ns: 'common' }),
            onClick: e => {
              e.stopPropagation();
              showDeleteModal(user);
            },
            show: userHasPermission({ permission: 'user:delete', data: user }),
          },
        ],
      })),
    [users, userHasPermission, showDeleteModal, showForgotPasswordModal, showResendActivationModal, t],
  );

  return { columns, data };
};
