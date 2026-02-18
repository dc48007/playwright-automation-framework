# Project setup — Node version management & Playwright notes

This document records the setup steps performed so far, why we use `nvm`, how to install Node via `nvm` on Windows, and recommended changes to JSON files in the repo.

**Summary — what we did**
- Created `docs/md/setup.md` to capture environment setup and Node management.

**Why use `nvm` (Node Version Manager)**
- Keeps multiple Node versions side-by-side and makes switching quick.
- Ensures reproducible environment for CI and local development (tests and Playwright browsers can require specific Node versions).
- Avoids global Node installs that might conflict across projects.


## Installing `nvm` on Windows

On Windows, use the nvm-windows distribution (often called just "nvm for Windows"). Steps:

1. Download the installer from the releases page:
   - https://github.com/coreybutler/nvm-windows/releases
2. Run the `nvm-setup.exe` installer and follow prompts.
   - Accept default install path (or choose one you prefer).
   - After install, open a new PowerShell window so the `nvm` command is available.

Common `nvm` commands (Windows):

```powershell
# See installed versions
nvm list

# See available versions (may require checking the repo releases page if not available via command)
# Install a specific version (example uses Node 18.x LTS):
nvm install 18.17.1

# Use a specific version
nvm use 18.17.1

# Check active version
node -v
npm -v
```

Notes:
- Replace `18.17.1` with the exact version you want for the project. Using an LTS major (e.g., `18`) is a common, stable choice for Playwright projects.
- If you prefer to pin a version for the repository, see the `.nvmrc` section below.


## Add a `.nvmrc` file (recommended)

Create a `.nvmrc` at the repo root containing the desired Node version, e.g.: 

```
18.17.1
```

This allows contributors to run `nvm use` (or `nvm install` then `nvm use`) and get the correct Node version automatically.


## Changes to `package.json` (recommended)

1. Add an `engines` field to communicate the Node versions supported by the project. Example:

```json
"engines": {
  "node": ">=18 <19"
}
```

2. Ensure useful `scripts` exist for running tests with Playwright. Example scripts to add/update:

```json
"scripts": {
  "test": "npx playwright test",
  "test:headed": "npx playwright test --headed",
  "test:report": "npx playwright show-report"
}
```

3. After changing `package.json`, run:

```powershell
npm install
```

This updates `package-lock.json` accordingly.


## Verify Node & Playwright

After installing and switching to the desired Node version:

```powershell
node -v
npm -v
npx playwright --version
npm install
npx playwright install  # installs browser binaries
npx playwright test --help  # verify test runner is available
```


## Notes & next steps

- If CI (GitHub Actions, Azure Pipelines, etc.) is used, make sure the CI config selects the same Node major version as `.nvmrc` or `engines`.
- Consider adding a short section in the repo `README.md` pointing to this `docs/md/setup.md` so contributors know how to set up Node.


---
File created: `docs/md/setup.md` — adjust Node versions as your project requires.
