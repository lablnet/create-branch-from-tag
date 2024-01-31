/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 265:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const core = __nccwpck_require__(734);
const { context } = __nccwpck_require__(238);
const github = __nccwpck_require__(238);

const fs = __nccwpck_require__(147);

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


/***/ }),

/***/ 734:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 238:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const run = __nccwpck_require__(265);

if (require.main === require.cache[eval('__filename')]) {
    run();
}

})();

module.exports = __webpack_exports__;
/******/ })()
;