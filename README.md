# create-branch-from-tag

This action will create a new branch from a tag.

This GitHub Action (written in JavaScript) wraps the [GitHub Branches API](https://docs.github.com/en/rest/branches/).

## Usage
### Pre-requisites
Create a workflow `.yml` file in your `.github/workflows` directory. An [example workflow](#example-workflow---create-a-release) is available below. For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

### Inputs
- `tag_name`: The name of the tag for this release
- `owner`: The name of the owner of the repo. Used to identify the owner of the repository.  Used when cutting releases for external repositories.  Default: Current owner
- `repo`: The name of the repository. Used to identify the repository on which to release.  Used when cutting releases for external repositories. Default: Current repository
- `description`:  custom prefix for creating the branch. Default: `release@`

### Outputs
- `branch_name`: The Branch Name
- `branch_url`: The URL users can navigate to in order to view the branch.

### Example workflow - create a release
On every `push` to a tag matching the pattern `v*`:

```yaml
on:
  push:
    # Sequence of patterns matched against refs/tags
    tags:
      - 'v*' # Push events to matching v*, i.e. v1.0, v20.15.10

name: Create Branch

jobs:
  build:
    name: Create Branch
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Create Branch
        id: create_branch
        uses: lablnet/create-branch-from-tag@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # This token is provided by Actions, you do not need to create your own token
        with:
          tag_name: ${{ github.ref }}
          owner: ${{ github.repository_owner }} # https://docs.github.com/en/actions/learn-github-actions/contexts#example-contents-of-the-github-context
          repo: ${{ github.event.repository.name }} # https://www.reddit.com/r/github/comments/tjkj6f/get_repo_name_on_github_actions_without_owner/
```

This will create a [Branch](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-and-deleting-branches-within-your-repository#creating-a-branch), This uses the `GITHUB_TOKEN` provided by the [virtual environment](https://help.github.com/en/github/automating-your-workflow-with-github-actions/virtual-environments-for-github-actions#github_token-secret), so no new token is needed.

## Contributing
We would love you to contribute to `@lablnet/create-branch-from-tag`, pull requests are welcome! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## License
The scripts and documentation in this project are released under the [MIT License](LICENSE)
