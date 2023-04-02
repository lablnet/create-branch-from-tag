const core = require('@actions/core');
const { context } = require('@actions/github');
const github = require('@actions/github');

const fs = require('fs');

async function run() {
    try {
        // Get authenticated GitHub client 
        const gh = github.getOctokit(process.env.GITHUB_TOKEN);

        // Get the input from the workflow file.
        let tag = core.getInput('tag_name', { required: true });
        tag = tag.replace(/^refs\/tags\//, '');
        const owner = core.getInput('owner', { required: true });
        const repo = core.getInput('repo', { required: true });
        const branch_prefix = core.getInput('branch_prefix', { required: false });


        // Create the branch
    const branch = `${branch_prefix ? branch_prefix : 'release@'} ${tag}`;

        core.info(`Creating branch ${branch}`);

        // Check if the branch already exists
        try {
            await gh.rest.repos.getBranch({
                owner,
                repo,
                branch: branch
            });
            core.setFailed(`Branch ${branch} already exists`);
            return;
        } catch (e) {
            // do nothing.
        }

        core.info(`Owner ${owner}`);
        core.info(`Repo ${repo}`);
        core.info(`sha ${context.sha}`);
        // Create the branch
        await gh.rest.git.createRef({
            owner,
            repo,
            ref: `refs/heads/${branch}`,
            sha: context.sha
        });

        // Set the output
        core.setOutput('branch_name', branch);
        core.setOutput('branch_url', `https://github.com/${owner}/${repo}/tree/${branch}`);
    } catch (error) {
        core.setFailed(error.message);
    }
}

module.exports = run;
