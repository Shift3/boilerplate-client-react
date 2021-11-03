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

## Sentry

The boilerplate is configured to use Sentry, an error logging service Shift3 uses (and loves). It just needs the Sentry DSN added to the environment variables. It can support different DSNs for different environments. It also keeps track of which environment is being logged, and the client version number.


## Terraform for AWS sandbox deployments

The boilerplate uses Terraform to facilitate provisioning a sandbox instance on AWS. This cuts down an all day event to a "run the script and wait 30-45 minutes for AWS to set everything up" event.

## CI

The boilerplate uses CircleCI for making sure projects can build, pass tests, and pass linting. It can even display the status of the primary branches in the README as badges.

## Unit tests

The boilerplate has working unit tests that cover the client business logic. This not only helps ensure code quality, it can serve as a great set of examples when learning how to write unit tests and how to write them in Angular.

## Consistent

This project uses [Prettier](https://prettier.io/) to enforce code style. It is highly opinionated by design with relatively scant options for customization. The thought process behind it is to ignore personal styling preferences and instead embrace consistency. There are `.prettierrc` and `.prettierignore` configuration files to adjust some options. Prettier is also wired up to a [pre-commit hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks). This DOES slightly slow down git, as it runs the hook on staged files every time `git commit` is executed.

Prettier can be configured within [editors](https://prettier.io/docs/en/editors.html) so that it formats files on save, which helps minimize any changes the pre-commit hook would need to make.