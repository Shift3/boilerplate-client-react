## Boilerplate Features

### Auth

The boilerplate has a client-side authentication and authorization system. It is built around JWT. It has pages to handle registering, login, forgot password, and activating accounts (from emails sent by the API).

The boilerplate is built around using roles to control authorization. There are four roles:

* User - the default user, and the user type created through registration. Can manage their own account and read content.
* Editor - All of the abilities of a user and can edit content.
* Admin - All of the abilities of an editor and can perform User CRUD for their own tenancy.
* Super Administrator - All of the abilities of an admin and can perform User CRUD for all tenancies.
* These roles are checked throughout the application with guards to prevent accidental access for less-elevated users.

### Multi-Tenancy
As mentioned above, the boilerplate supports multi-tenancy. This feature is unobtrusive if it's not necessary.

### Admin

### Content

### User