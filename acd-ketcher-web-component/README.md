## Prerequisites

- Docker
- Visual Studio Code + [Dev Containers extensions](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

## Development

All new feature and bug-fixes should came with tests.
Tests are run inside docker container using specific version of google-chrome.
You can use ready-to-go dev-container.
To do so open **VS Code**, install [Dev Containers extensions](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
extension, press **Ctrl + Shift + P** and type **Dev Containers: Reopen in Container**
After starting the container you need to install packages.

On windows host it is recommended to keep separate packages inside host-machine and container. [git worktree](https://git-scm.com/docs/git-worktree) might help with that.

If you have any trouble with dev-container try clean you working tree and reinstall packages first:

```sh
docker run hello-world
git clean -fdx
npm install
npm run build
cd acd-ketcher-web-components
npm install
```

### Ketcher

If you make some changes in ketcher package you will have to rebuild this one and reinstall packages in `acd-ketcher-web-component` directory.

## Build

To build web-components you have to install packages first.

Execute in the root of the repository the following commands:

```sh
yarn install
yarn build
```

Now you can install necessary dependencies for web-components. Execute the following command in `acd-ketcher-web-component` directory

```sh
npm install
```

This command will link ketcher packages from `./packages` directory.

Now you ready to build web-components:

```sh
npm run build
```

## Tests

To run tests execute the following command from acd-ketcher-web-component directory:

```sh
npm run test
```

or in watch mode:

```sh
npm run test:watch
```

### Testing server

During development it might be helpful to save some svg or html files from running tests to the filesystem. For example you may save result of comparison svg images to file to see the difference.
Because tests run in browser inside the container it is not possible directly. To bypass these limitations are simple testing server was written.
To start start server execute the following command in `testing-server` directory:

```sh
npm install
npm run start
```

Now you can perform http request to save files into the `files` directory next to testing-server:

```
POST http://localhost:6789/saveToFile
```

[See examples in the code (`saveToFile`)](src/tests/utils.ts#saveToFile) (`saveToFile`)

### Indigo-ketcher changes

We use local indigo-ketcher package that has fix for rendering charged radicals issue. To biuld this package clone https://github.com/epam/Indigo.git, switch to tag release/1.35, install all required prerequisites mentioned in Indigo-WASM section of README.md, apply indigo-ketcher.patch and set MY_EMSDK_DIR - installed emsdk folder and MY_INDIGO_DIR - folder with cloned Indigo repository variables in build-indigo-ketcher.cmd file. Run this cmd and find compiled package in MY_INDIGO_DIR\build\bin folder.
