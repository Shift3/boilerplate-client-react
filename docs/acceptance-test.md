## Acceptance Test

This is a comprehensive acceptance test for this project. It should include testing procedure for all features of the application.

### Description

The React Boilerplate is a foundational web app for the development of client projects.

### Environment

To test the current build of the React Boilerplate, go to https://boilerplate-client-react.shift3sandbox.com/agents and log in with the account(s) that you created in the past or ask your QA Lead for access.

### Credentials

If anyone needs credentials, please have them make a request in the `proj-boilerplates` Slack channel.

### Supported Devices

- Web
- Mobile
- Tablet

### Accessibility Requirements

- WCAG 2.0 Level A and AA
- WAI - ARIA 1.1

### Acceptance Criteria

#### General Requirements

- [ ] Each page should be responsive for web, mobile, and tablet screen sizes
- [ ] Each page should meet the minimum accessibilty requirements
- [ ] ~~Each page should support internationalization (English / Spanish) for static content (buttons, labels, headers, toasts). User content and server-driven text are not translated.~~
- [ ] Error handling: If a managed error occurs, the user should get a well-formatted error toast and/or error messages within the form.
- [ ] Error handling: If an unmanaged error occurs, the user should be navigated to an error page which says "Something went wrong." No errors should cause catastrophic behavior or loss of function within the app.
- [ ] Route IDs: Paths in the application user guid routes which will look something like: `/users/update-user/13db29c3-1052-4980-b4ef-48f59fe559ee`. The application should gracefully handle invalid IDs typed into the url.

#### Initial Page Load

- [ ] Confirm that the webapp shows a loading screen. Note that this page is in English only.
- [ ] Confirm that the webapp loads the login screen when first loaded if the user is logged out, and goes to the role-appropriate home page when the user is logged in.

#### Register Account / Sign Up

- [ ] Confirm that clicking on Register from the Login page navigates to the Member Registration page.
- [ ] Try signing up with an invalid email or a too short password (less than 8 digits) and confirm that it fails.
- [ ] Try signing up with valid credentials (save them).
- [ ] Upon successfully signing up, confirm that the webapp navigates to the Login page.
- [ ] Try logging in with the new account created above and confirm that it succeeds.

#### Activate Account

An `Admin` can invite a new user from the User Administration page which will kick off the Acount Activation workflow:

- [ ] Confirm that clicking on the email takes you successfully to Account Activation page on the website.
- [ ] Set a new password.
- [ ] Confirm that the password requirement validation is in place (it won't let you use an invalid password).
- [ ] Confirm that on success, it shows you a success message (these will look nicer in the future!).
- [ ] Confirm that on success, the site navigates back to the login page.
- [ ] Confirm that logging in with the new password works.
- [ ] An activation email link can only be used one.
- [ ] An invalid or expired activation link should not work, and the error should be handled gracefully.
- [ ] Sending a new activation email should invalidate the previous link.

#### Login

- [ ] Confirm that trying to login with incorrect credentials results in a "unable to login" error message toast.
- [ ] Confirm that logging in with the correct credentials is successful and navigates to the appropriate Home Page.
- [ ] Clicking on Forgot Password should initiate the [Forgot Password Workflow](#forgot-password-workflow).
- [ ] If the user is already logged in, the Login page should redirect them to the appropriate Home Page if you try to navigate directly to (https://boilerplate-client-react.shift3sandbox.com/auth/login).
- [ ] If the user is logged out, all pages should redirect them to the Login page.

#### Logout

- [ ] Clicking on the User's profile icon (or placeholder icon) should show a dropdown menu with a Sign Out option.
- [ ] Clicking Sign Out should show a confirmation modal.
- [ ] Once the user is logged out, their session should be destroyed and the should be navigated to the Login page.
- [ ] Verify the user's session (cookies / tokens) are destroyed and authenticated pages cannot be accessed.

#### Navigation Menu (User Logged Out)

- [ ] Confirm that the navigation menu does not show any links aside from the "Login/Create Account" button.
- [ ] Try to manually navigate to the users screen "[boilerplate-client-react](https://boilerplate-client-react.shift3sandbox.com/users)" and confirm that the website does not let you visit it.
- [ ] Do the same for the directory screen [boilerplate-client-react](https://boilerplate-client-react.shift3sandbox.com/farms) and confirm that it does not let you view the content.

#### Navigation Menu (User Logged In)

The menu will allow users to navigate to a homepage, directory, administration page, notifications, user settings, and logout (depending on their role and permissions).

- [ ] The menu should be responsive and collapse to a hamberger menu for smaller screens.
- [ ] The hamburger menu should show the same options as the full-screen menu.
- [ ] The `User` and `Editor` roles should not see or have access to the Administration page. The `Admin` role should see the Administration page.
- [ ] The Administration menu item should be a dropdown containing a Users navigation item.
- [ ] Clicking on the User's profile icon (or placeholder icon) should show a dropdown menu to access Account Settings. This dropdown should also show the user's profile photo, first name, last name initial, and role.

#### Home Page

The home page in this app is currently an empty template page which will show slightly different content for each role.

- [ ] As a `User` role, verify the home page shown is the "User Home Page".
- [ ] As an `Editor` role, verify the home page shown is the "Editor Home Page".
- [ ] As an `Admin` role, verify the home page shown is the "Admin Home Page".

#### Directory Page

The directory page is a list of farms which features tranditional CRUD actions (create, read, updated, delete). Any user permission level should be able to view this screen.

- [ ] `Users`, `Editors`, and `Admins` should be able to view the list of farms.
- [ ] The list of farms should be paginated. Verify the pagination functionality.
- [ ] The list of farms should be searchable and filterable. Verify the search and filter functionality.
- [ ] Farms in the list should have a delete button. The button should show a confirmation modal. Cancel and Delete on the modal should work as expected.
- [ ] Clicking the Add Farm button should bring up the Create Farm page.
- [ ] Clicking on a farm in the list should bring up the Edit page for that farm.

#### Create and Edit Farms

The Create and Edit pages for farms are functionally identical entry forms which allow creating new farms or modifying existing farm entries.

- [ ] The Name, Email, Phone Number, and Description fields should be required before the Create/Edit button can be clicked.
- [ ] The Email and Phone Number fields should include formatting validation and show an error if formatting requirements are not met.
- [ ] When editing a farm, the list of Latest Changes should be shown below the form. This should list any Create, Update, or Delete actions which have happened on that particular farm. It should include the name of the user that initiated the action.
- [ ] If more than 5 Latest Changes exist, it should show the latest 5 changes and a link to view more changes.
- [ ] If you have unsaved changes and try to navigate away from the form, a warning modal should be shown. The user can stay on the page or discard the changes and navigate away.

#### Administration Page (User Management)

The User List page is an administration page which allows for CRUD actions (Create, Read, Update, Delete) on user accounts.

- [ ] Only the `Admin` role should be able to access this page.
- [ ] The list of users should be paginated. Verify the pagination functionality.
- [ ] The list of users should be searchable and filterable. Verify the search and filter functionality.
- [ ] Users in the list should have a delete button. See [Delete User](#delete-user)
- [ ] Users in the list should have a Reset Password button. This should initiate the [Forgot Password Workflow](#forgot-password-workflow) for that user.
- [ ] Clicking the Add User button should bring up the Create User page.
- [ ] Clicking on a user in the list should bring up the Edit page for that user.

#### Create and Edit Users

The Create and Edit pages for users are functionally identical entry forms which allow creating new users or modifying existing user entries.

- [ ] Only the `Admin` role should be able to access or interact with these pages.
- [ ] The Name, Email, and Role fields should be required before the Create/Edit button can be clicked.
- [ ] The Email fields should include formatting validation and show an error if formatting requirements are not met.
- [ ] When editing a user, the list of Latest Changes should be shown below the form. This should list any Create, Update, or Delete actions which have happened on that particular entry. It should include the name of the user that initiated the action.
- [ ] If more than 5 Latest Changes exist, it should show the latest 5 changes and a link to view more changes.
- [ ] ~~An Admin should not be able to edit their own role.~~
- [ ] ~~The Edit user page should have a disable/enable user button. The button should show a confirmation modal. Cancel and Disable on the modal should work as expected.~~
- [ ] If you have unsaved changes and try to navigate away from the form, a warning modal should be shown. The user can stay on the page or discard the changes and navigate away.

#### Delete User

- [ ] Click on the delete user icon (please choose a user that you have created for this purpose and do not delete anyone else's users). Confirm that a modal appears and it does not yet delete the user.
- [ ] Confirm that the modal asks if you want to delete the user, and shows the selected user's name.
- [ ] Confirm that clicking cancel returns you to the user screen without deleting the user.
- [ ] Confirm that clicking delete returns you to the user list.
- [ ] Confirm that after returning to the user list, the table updates and the deleted user disappears.
- [ ] Try to delete your own user (have a backup admin user before trying this just in case)! It should fail, and show you a message stating that you cannot delete your own user.

#### Notifications

The Navigation Menu shows a bell icon which allows the user to view their in-app notifications. This will have a red dot over it when there are unread notifications. Additionally, an email is sent to the user when they receive a notification.

- [ ] When a new farm is created, `Admin` users should receive an in-app notification and an email notification.
- [ ] When an admin receives a notification while logged in, they will see a toast message at the top of the screen.
- [ ] A red dot should show on the notification bell icon when there are unread notifications.
- [ ] Clicking on the notification bell icon should show a modal with tabs for Unread and Read notifications.
- [ ] A notification should show the name of the farm that was created and the name of the user that created it. The farm name and user name should both be clickable and bring you to that farm or user Edit page.
- [ ] If a user has no notifications, it should show "No Notifications" and not have a red dot over the icon.
- [ ] The Mark All As Read link should move all Unread notifications to the Read category and remove the red dot.
- [ ] The View All Notifications button should bring the user to the My Notifications page. This page should show tabs for Unread and Read notifications.
- [ ] If there are more than 5 notifications in either the Unread or Read category, it should show the latest 5 notifications and a Load More button to view more entries.

#### Account Settings

Account Settings can be accessed by clicking on the User's profile icon (or placeholder icon) in the Navigation Menu. The Account Settings page allows a user to configure their user account, change password, and modify personalized settings.

- [ ] Under App Settings the user can change their Theme Preference (dark mode) and change their Language Preference (English / Spanish). These changes should apply and save immediately. These settings should persist through a full page reload.
- [ ] Under Profile, the user should be able to update their First and Last name. These fields should be required.
- [ ] Under Profile, the user should be able to upload or delete their profile photo.
- [ ] Under Profile, the user can change their email address. This should send them a confirmation email to the new email address.
- [ ] Under Security and Password, the user can change their password by entering their new and current password. This field should ensure that the New and Confirm passwords match and that the password format requirements are enforced.
- [ ] Under Security and Password, the user can click on Reset My Password to initiate the [Forgot Password Workflow](#forgot-password-workflow).

#### Forgot Password Workflow

This workflow allows a user to change their password if it was forgotten. The user will receive an email with a special link allowing them to enter a new password.

- [ ] Initiate the Forgot Password workflow from the Login Page, Account Settings Page, or User List page as an `Admin`.
- [ ] The user should receive an email with a special link taking them to the Forgot Password page.
- [ ] Using this link, the user should be able to enter a new password. Ensure that password format requirements are enforced.
- [ ] The link should be invalidated after the user has used it.
- [ ] An invalid or expired link should not function, and the error handled gracefully.
- [ ] A user should not be able to edit a password without a valid link.

#### User Session Expired / User Deleted

The User should receive a forbidden or unauthorized error code if their account is disabled or session expires while logged in.

- [ ] Log in with one user
- [ ] In a separate browser, log in with an admin
- [ ] Delete the account of the user. When this happens, the user should be logged out of the app and be presented with the log in screen and a toast message that describes what happened.
