# Contributing

Looking to help out? Please take a look at [good first issue](https://github.com/Shift3/boilerplate-client-react/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) tagged issues.

## Contribution Standards

- New features must be approved and pass architectural review. We want to thoughtfully design features and consider likely use-case scenarios.
- Contributions must follow the current project conventions. We want consistency in this boilerplate. The style should be enforced by the code formatter through the existing configuration to prevent unnecessary style changes.
- New features or fixes need to be user tested, and QA must be provided acceptance tests that cover the use cases and environments that they must test, per [the official standard](https://github.com/Shift3/standards-and-practices/blob/main/standards/acceptance-testing.md).
- New code contributions need approval from the code owners, along with an additional member of the Shift3/devs-react team. The code will be carefully reviewed and tested.
- CI must pass. Currently the CI checks if the project builds, if the linter passes, and if the tests pass. All existing code contributions had to pass CI to be merged.
  - All existing tests must pass. They can be modified if necessary, but tests help ensure that the code actually does what is intended.
  - New business logic needs unit test coverage. Any new logic added to the boilerplate should be tested to ensure functionality, and guard against edge cases.

## Code Owner Responsibilities

- Boilerplate deployments need to be updated on merging of new features/fixes.
- Keep releases and tags up to date following the [official standards](https://github.com/Shift3/standards-and-practices/blob/main/standards/code-versioning.md).
- Keep project dependencies and tooling up to date.
- Schedule QA to test new merged features/fixes.
