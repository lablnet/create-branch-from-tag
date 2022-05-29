const core = require('@actions/core');
const { GitHub, context, github } = require('@actions/github');
const fs = require('fs');

async function run() {
    try {
        // Get authenticated GitHub client 
        //const github = new GitHub(process.env.GITHUB_TOKEN);
        const gh = new github.getOctokit(process.env.GITHUB_TOKEN);

        // Get the owner and repo from the github context
        const { currentOwner, currentRepo } = context.repo;

        // Get the input from the workflow file.
        let tag = core.getInput('tag_name', { required: true });
        tag = tag.replace(/^refs\/tags\//, '');
        const owner = core.getInput('owner', { required: false }) || currentOwner;
        const repo = core.getInput('repo', { required: false }) || currentRepo;
    

        // Create the branch
        const branch = `release@${tag}`;

        // check if the branch already exists
        const { data: existingBranch } = await gh.repos.getBranch({
            owner,
            repo,
            branch: branch
        });
        if (existingBranch) {
            core.setFailed(`Branch ${branch} already exists`);
            return;
        }

        // Create the branch
        await gh.git.createRef({
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
