import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { FC, useLayoutEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../userApi';

interface RouteParams {
  id: string;
}

export const UpdateUserView: FC = () => {
  const { id } = useParams<RouteParams>();
  const history = useHistory();
  const { showErrorNotification } = useShowNotification();

  // Since the UserListView is subscribed to the query and we just want to pick an item from that query,
  // we do not need to perform an additional request here. Instead, we can use the `selectFromResult` option
  // to get a specific item from the cached query result. For more info, see the following RTK Query docs
  // https://redux-toolkit.js.org/rtk-query/usage/queries#selecting-data-from-a-query-result.
  const { user } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data: users }) => ({
      user: users?.find((user) => user.id === Number(id)),
    }),
  });

  // Since a user can manually type in any random id into the url, we need to ensure `id` is a string that represents
  // a valid number, and that `id` is a valid user id for one of the agencies from the query result in the list view.
  // useLayoutEffect` is used instead of `useEffect` so that the check and redirect occur before the component gets
  // rendered for the first time to the screen.
  useLayoutEffect(() => {
    if (Number.isNaN(Number(id)) || !user) {
      showErrorNotification('Unable to load user. Returning to user list.');
      history.replace('/users');
    }
  }, [id, history, user, showErrorNotification]);

  return <div>Update User</div>;
};
