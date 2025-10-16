# Yarn Package Manager Setup

This project uses **Yarn 4** with **Workspaces** for efficient dependency management across the monorepo.

## 🎯 Why Yarn?

- **Faster**: Parallel installs and better caching
- **Workspaces**: Native monorepo support
- **Plug'n'Play**: Optional zero-installs capability
- **Deterministic**: Lockfile ensures consistent installs
- **Better DX**: Improved error messages and UX

## 📦 Installation

### 1. Enable Corepack (Recommended)

Corepack comes with Node.js 16.10+:

```bash
corepack enable
```

This automatically uses the version specified in `package.json`.

### 2. Manual Installation (Alternative)

```bash
npm install -g yarn
```

## 🚀 Quick Start

### Install All Dependencies

```bash
yarn install
```

This installs dependencies for all workspaces (root, API, Web, and shared library).

### Development

```bash
# Start API
yarn api:dev

# Start Web
yarn web:dev

# Start both (in separate terminals)
yarn api:dev
yarn web:dev
```

### Building

```bash
# Build API
yarn api:build

# Build Web
yarn web:build

# Build everything
yarn build:all
```

## 🏗️ Workspace Structure

```
nx-mono-repo-deployment-test/
├── package.json              # Root workspace
├── apps/
│   ├── api/
│   │   └── package.json      # API workspace
│   └── web/
│       └── package.json      # Web workspace
└── libs/
    └── shared/
        └── package.json      # Shared library workspace
```

## 📝 Workspace Commands

### Running Scripts in Specific Workspaces

```bash
# API workspace
yarn workspace api dev
yarn workspace api build
yarn workspace api start

# Web workspace
yarn workspace web dev
yarn workspace web build
yarn workspace web start

# Shared library
yarn workspace @nx-mono-repo-deployment-test/shared build
```

### Adding Dependencies

**To a specific workspace:**
```bash
# Add to API
yarn workspace api add express

# Add dev dependency to API
yarn workspace api add -D @types/express

# Add to Web
yarn workspace web add next react react-dom
```

**To root workspace:**
```bash
yarn add -D typescript prettier
```

### Removing Dependencies

```bash
# Remove from API
yarn workspace api remove express

# Remove from Web
yarn workspace web remove axios
```

### List Workspaces

```bash
yarn workspaces list
```

## 🎯 Available Scripts

### Root Level

```bash
yarn api:dev             # Start API in dev mode
yarn api:build           # Build API
yarn api:start           # Start API in production
yarn web:dev             # Start web in dev mode
yarn web:build           # Build web
yarn web:start           # Start web in production
yarn shared:build        # Build shared library
yarn build:all           # Build all projects
yarn install:all         # Install all dependencies (alias for yarn install)
yarn type-check          # Type check all TypeScript
yarn docker:build        # Build Docker images
yarn docker:up           # Start Docker containers
yarn docker:down         # Stop Docker containers
```

### Workspace-Specific

**API:**
```bash
yarn workspace api dev         # Dev mode with hot reload
yarn workspace api build       # Build TypeScript
yarn workspace api start       # Run production build
yarn workspace api lint        # ESLint
yarn workspace api lint:fix    # ESLint with auto-fix
```

**Web:**
```bash
yarn workspace web dev         # Next.js dev server
yarn workspace web build       # Build for production
yarn workspace web start       # Start production server
yarn workspace web lint        # Next.js linter
yarn workspace web type-check  # TypeScript type checking
```

## 📊 Yarn Configuration

### .yarnrc.yml

```yaml
nodeLinker: node-modules
yarnPath: .yarn/releases/yarn-4.0.2.cjs
```

**Options:**
- `nodeLinker: node-modules` - Uses traditional node_modules (compatible with all tools)
- `yarnPath` - Specifies Yarn version to use

### Package Manager Field

In `package.json`:
```json
{
  "packageManager": "yarn@4.0.2"
}
```

This ensures everyone uses the same Yarn version.

## 🔍 Understanding Workspaces

### Benefits

1. **Shared Dependencies**: Common packages installed once
2. **Hoisting**: Dependencies hoisted to root when possible
3. **Linking**: Workspaces can reference each other
4. **Atomic Operations**: Single `yarn install` for everything

### How It Works

```json
{
  "workspaces": [
    "apps/api",
    "apps/web",
    "libs/shared"
  ]
}
```

Yarn automatically:
- Links workspaces together
- Hoists common dependencies
- Manages inter-workspace dependencies

## 🐳 Docker with Yarn

### Dockerfiles Use Yarn

```dockerfile
# Enable Corepack for Yarn
RUN corepack enable && corepack prepare yarn@4.0.2 --activate

# Install dependencies
RUN yarn workspaces focus api --production=false

# Build
RUN yarn build
```

### Optimizations

- Uses `yarn workspaces focus` for single workspace
- Caches layers effectively
- Production-only dependencies in final image

## 🚨 Common Commands

### Install Dependencies

```bash
yarn install                    # Install all workspaces
yarn install --immutable        # CI mode (fails if lockfile changes)
yarn install --check-cache      # Verify cache integrity
```

### Upgrade Dependencies

```bash
yarn up package-name            # Upgrade specific package
yarn up                         # Interactive upgrade
yarn up -i                      # Interactive upgrade all
```

### Clean Install

```bash
rm -rf node_modules
rm yarn.lock
yarn install
```

### Check Outdated Packages

```bash
yarn outdated
```

### Why Package Failed

```bash
yarn why package-name
```

## 🔧 Troubleshooting

### Issue: Command not found

**Solution:** Enable Corepack
```bash
corepack enable
```

### Issue: Wrong Yarn version

**Solution:** Use Corepack
```bash
corepack enable
corepack prepare yarn@4.0.2 --activate
```

### Issue: Lockfile conflicts

**Solution:** Regenerate lockfile
```bash
rm yarn.lock
yarn install
```

### Issue: Slow installs

**Solution:** Clear cache
```bash
yarn cache clean
yarn install
```

### Issue: Workspace not found

**Solution:** Check workspace name in package.json
```bash
yarn workspaces list
```

## 📚 Yarn vs NPM

### Command Equivalents

| NPM | Yarn |
|-----|------|
| `npm install` | `yarn install` |
| `npm install package` | `yarn add package` |
| `npm uninstall package` | `yarn remove package` |
| `npm run script` | `yarn script` |
| `npm ci` | `yarn install --immutable` |
| `npm update` | `yarn up` |
| `npm outdated` | `yarn outdated` |

### Why Workspaces Over npm

- Better performance
- Native workspace support since v1
- More reliable linking
- Better error messages
- Zero-installs option (optional)

## 🎓 Advanced Features

### Constraints

Define workspace constraints in `.yarnrc.yml`:

```yaml
plugins:
  - path: .yarn/plugins/@yarnpkg/plugin-workspace-tools.cjs
    spec: "@yarnpkg/plugin-workspace-tools"
```

### Protocols

```bash
# Link to workspace
yarn workspace api add @nx-mono-repo-deployment-test/shared@workspace:*

# Use specific version
yarn workspace web add react@^18.2.0
```

### Selective Dependency Resolutions

In root `package.json`:

```json
{
  "resolutions": {
    "lodash": "^4.17.21"
  }
}
```

## 📖 Resources

- [Yarn Official Docs](https://yarnpkg.com)
- [Yarn Workspaces](https://yarnpkg.com/features/workspaces)
- [Migrating from npm](https://yarnpkg.com/getting-started/migration)
- [Yarn CLI](https://yarnpkg.com/cli)

## ✅ Best Practices

1. ✅ Always commit `yarn.lock`
2. ✅ Use `yarn install --immutable` in CI
3. ✅ Keep Yarn version in `packageManager` field
4. ✅ Use workspace protocol for local packages
5. ✅ Run `yarn dedupe` periodically
6. ✅ Use `yarn workspaces focus` in Docker
7. ✅ Enable Corepack for version management

---

**You're now using Yarn 4 with Workspaces! 🎉**

Enjoy faster installs and better workspace management!

