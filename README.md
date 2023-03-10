# Azure DevOps Bookmarklets

[![GitHub package.json version](https://img.shields.io/github/package-json/v/jamiegluk/azure-devops-bookmarklets?color=blue)](https://github.com/jamiegluk/azure-devops-bookmarklets/releases)
[![GitHub lint Workflow Status](https://img.shields.io/github/actions/workflow/status/jamiegluk/azure-devops-bookmarklets/lint.yml?label=lint)](https://github.com/jamiegluk/azure-devops-bookmarklets/actions/workflows/lint.yml)
[![GitHub build Workflow Status](https://img.shields.io/github/actions/workflow/status/jamiegluk/azure-devops-bookmarklets/build.yml?label=build)](https://github.com/jamiegluk/azure-devops-bookmarklets/actions/workflows/build.yml)
[![GitHub deploy Workflow Status](https://img.shields.io/github/actions/workflow/status/jamiegluk/azure-devops-bookmarklets/deploy.yml?label=deploy)](https://github.com/jamiegluk/azure-devops-bookmarklets/actions/workflows/deploy.yml)

Browser bookmarklet utilities for helping with Azure DevOps.

<br/>

## Bookmarklets

# [CLICK HERE TO GET](https://jamiegluk.github.io/azure-devops-bookmarklets)

<br/>

## Installation

You need:

- [Node.js](https://nodejs.org) / `choco install nodejs`
- [Yarn](https://yarnpkg.com/) / `choco install yarn`

Initially build dependencies via this command in the project folder:

```
yarn install
```

## Usage

```bash
yarn build
yarn deploy
```

---

### All commands

| Command                   | Description                                                                                         |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| `yarn build`              | Build app as dev to `/dist/`                                                                        |
| `yarn build:b-total-size` | Builds `/src/bookmarklet-total-size.ts` to `/.build/bookmarklet-total-size.js``                     |
| `yarn build:b-user-guid`  | Builds `/src/bookmarklet-user-guid.ts` to `/.build/bookmarklet-user-guid.js`                        |
| `yarn build:env`          | Delegate for above 2, runs parcel                                                                   |
| `yarn build:html`         | Takes JS files and injects as URIs into `template.html` content, outputting to `/.build/index.html` |
| `yarn deploy`             | Deploys GitHub pages from `/.build/index.html`                                                      |
| `yarn lint`               | Run Prettier linter                                                                                 |
| `yarn lint:fix`           | Run Prettier linter and fix issues                                                                  |
|                           |
| `yarn clean`              | Runs all clean commands below                                                                       |
| `yarn clean:build`        | Removes _.build_ folder and its contents                                                            |
| `yarn clean:cache`        | Removes Parcel _.cache_ folder and its contents                                                     |

---

## Contributing

Feel free to submit a pull-request or fork as your own.

## Copyright & Licensing

Licensed for use under the MIT License.  
See [LICENSE](LICENSE).
