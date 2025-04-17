## Report an issue

We track our issues with Jira at https://jira.dhis2.org under the [LIBS](https://jira.dhis2.org/projects/LIBS) project. You can use the links below to open an issue with the relevant fields prepopulated:

-   [Bug](https://jira.dhis2.org/secure/CreateIssueDetails!init.jspa?pid=10700&issuetype=10006&components=11015)
-   [Feature](https://jira.dhis2.org/secure/CreateIssueDetails!init.jspa?pid=10700&issuetype=10300&components=11015)
-   [Task](https://jira.dhis2.org/secure/CreateIssueDetails!init.jspa?pid=10700&issuetype=10003&components=11015)

## Automated releases

We use semantic release to publish the changes to `@dhis2/ui` automatically. This allows us to easily and quickly publish updates with the correct version number and a generated changelog. Semantic release uses commit messages to deduce what has been changed and how that should affect the version number. See the [semantic release docs](https://github.com/semantic-release/semantic-release#readme) for more detail.

To allow semantic release to analyse our commits we use [conventional commits](https://www.conventionalcommits.org) for our allowed commit types. See [this list](https://github.com/commitizen/conventional-commit-types/blob/master/index.json) for a summary of the available types and their usage. Since semantic release analyses commits, preserving commit hashes between branches is sometimes important. There are [recipes](https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/distribution-channels.md#publishing-on-distribution-channels) available in the semantic-release repository for most scenarios, but for convenience these are the merge types you can use for the two most common scenarios:

-   When merging from a feature branch to a release branch we recommend you use a squash merge. A regular merge, squash merge, and rebase merge are all technically ok, but a squash merge ensures that only the PR title and squash commit message will be used for generating the changelog.
-   When merging from a release branch to another release branch you must use a regular merge so that the commit hashes are preserved.

## Submitting a PR

A PR is always welcome. We recommend discussing the proposed change first by opening a relevant Jira issue, so that we can prioritize the work and help out with the changes you'd like to make.

Adding Icons to @dhis2/ui-icons

The @dhis2/ui-icons build process will take care of most things for you. If you want to add an icon, follow these steps:

    Add the Icon as an SVG

        Add the icon to the packages/icons/src/svg directory.

        Ensure that the icon file follows the existing naming conventions:

            Use kebab-case for the icon name.

            If applicable, include the variant and size in the name following the icon name (e.g., icon-name-variant-size.svg).

            Example: settings-filled-24.svg or search-outline-16.svg.

    Ensure Proper Fill Color

        Set the fill color to currentColor for all path elements in the SVG.

        Do not set a fixed fill color like #010101 as the build process will handle it.

    Correct Example:

<path fill="currentColor" d="M12 2L2 12h10l-2 2L22 12h-10z"/>

SVG Optimization

    The build process automatically optimizes the SVG files using svgo, so you do not need to manually optimize them.

    Ensure that there is no redundant code or unnecessary whitespace in the SVG before adding it.

Commit Message

    Use the feat commit type for your changes so that the change will be automatically published when the PR is merged, and it will be included in the changelog.

Example Commit Message:

feat: add new "settings-filled" icon with 24px size
