### DashRD frontend

## initial start

-   run `git pull` (pull latest changes)
-   run `npm i` (install all packages)
-   run `npm run dev` (start development server) (see "Starting the development server")

### Starting the development server

-   This is a NextJS Application built with ReactJS + Typescript
-   To start a development server that makes changes instantly with hot-module reload, run `npm run dev`
-   To access the development site, go to localhost:8006

### Building the NextJS Application

-   Building the NextJS Application involves redering React Code into static HTML, CSS, and JS files that are served to the client. They are then served to the client via a server or CDN.
-   To build and simulate the application in production, use `npm run build` and then `npm start`. The "production" site will be live again at localhost:8006

### Pre-Build script

-   Before the application builds there is a pre-build script which populates `categories.db`, `configurations.db`, and `templates.db` as cache so that these files can be used during the build process
-   This script also checks against the current backend version number
-   An initial script called `runner.ts` runs all files in the pre-build directory
    -   Right now there is just one called `build-cache.ts`

### Storybook

-   We use Storybook to build and manage UI components
-   To run the storybook interface locally, run `npm run storybook`

### Git Flow

Overview:

-   The `master` branch is for production code. If no code is actually production, it's mock-production. Broken code shouldn't exist here.
-   The `staging` branch is for features/fixes that are about to be production, but not quite. Periodically, all features are tested in `staging` and then merged to `master`. Broken code shouldn't exist here, but can. It's a last-minute check before moving the changes to master.
-   The `development` branch is for testing how new features work together. Broken code is likely to exist here, and to fix it it should be fixed in feature/fix branches that are further merged into the `development` branch
-   Feature branches (ex. `feat_53385-phone-number-auth-implementation`) are for developing and testing code. The process for these is listed below:

Process:

-   For each task, branch off of `staging`
-   Name the branch `<fix/feat>_<notion task ID>-<a-couple-task-title-details>`
    -   example: `feat_53385-phone-number-auth-implementation`
-   Write code and make any necessary commits to the feature/fix branch. Periodically commit and push to the github origin (`git push --set-upstream origin <branch name>`)
-   Test the code on the feature/fix branch. When it looks good, checkout the `development` branch and merge the feature branch into `development` (`git pull origin <feature branch name>`)
-   Make sure everything works there as well. If it doesn't checkout the feature branch again, make more commits, then re-merge into development.
-   If there is a merge conflict merging the feature branch into `development`, make the commit directly to `development`
-   submit a pull request to merge the feature branch back into staging
-   tag the card as `needs review` and notify the person reviewing the pull request
-   the reviewer will merge into staging and delete the feature branch
