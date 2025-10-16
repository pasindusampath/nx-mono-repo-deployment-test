# TypeScript Setup Guide

This project is fully configured with TypeScript for type safety and better developer experience.

## 📦 What's Configured

### Backend API (Express + TypeScript)
- ✅ Full TypeScript support
- ✅ Express with proper types
- ✅ ts-node-dev for development
- ✅ ESLint with TypeScript rules
- ✅ Source maps enabled

### Frontend Web (Next.js + React + TypeScript)
- ✅ Next.js 14 with TypeScript
- ✅ React 18 with TypeScript
- ✅ Strict type checking
- ✅ Path aliases (@/*)
- ✅ ESLint with Next.js rules

### Shared Library
- ✅ Full TypeScript support
- ✅ Type definitions exported
- ✅ Shared interfaces and types

## 🚀 Getting Started

### 1. Install Dependencies

```bash
# Install all dependencies (includes TypeScript)
npm run install:all
```

This will install TypeScript and all type definitions for:
- `@types/node`
- `@types/express`
- `@types/react`
- `@types/react-dom`
- And more...

### 2. Development

**Start API in development mode:**
```bash
npm run api:dev
```
Uses `ts-node-dev` for hot reloading with TypeScript

**Start Web in development mode:**
```bash
npm run web:dev
```
Next.js automatically compiles TypeScript

### 3. Building

**Build API:**
```bash
npm run api:build
```
Compiles TypeScript to JavaScript in `apps/api/dist/`

**Build Web:**
```bash
npm run web:build
```
Next.js handles TypeScript compilation

**Build Everything:**
```bash
npm run build:all
```
Builds shared library, API, and web app

### 4. Type Checking

```bash
# Check types across the project
npm run type-check
```

## 📁 TypeScript Configuration

### Root tsconfig.base.json
Base configuration shared across all apps:
- Strict mode enabled
- ES2020 target
- Path aliases configured
- Source maps enabled

### apps/api/tsconfig.json
API-specific configuration:
- CommonJS modules
- Node.js types
- Outputs to `dist/`
- Strict typing

### apps/web/tsconfig.json
Web-specific configuration:
- Next.js plugin
- React JSX support
- DOM types
- Path aliases (@/*)

### libs/shared/tsconfig.json
Library configuration:
- Generates .d.ts files
- CommonJS output
- Strict typing

## 🎯 TypeScript Features Used

### Type Inference
```typescript
// TypeScript automatically infers types
const items = ['item1', 'item2']; // string[]
```

### Interfaces
```typescript
interface Item {
  id: number;
  name: string;
  description?: string; // optional
}
```

### Function Types
```typescript
const getItems = (req: Request, res: Response): void => {
  // ...
};
```

### Generics
```typescript
const [items, setItems] = useState<Item[]>([]);
```

### Type Guards
```typescript
if (typeof item === 'object' && item !== null) {
  // TypeScript knows item is an object here
}
```

## 📝 Writing TypeScript

### API (Express)
```typescript
import { Request, Response } from 'express';

export const createItem = (req: Request, res: Response): void => {
  const { name, description } = req.body;
  // TypeScript will check types
};
```

### Web (React)
```typescript
interface Props {
  title: string;
  count?: number;
}

export default function MyComponent({ title, count = 0 }: Props) {
  return <div>{title}: {count}</div>;
}
```

### Shared Types
```typescript
// libs/shared/src/index.ts
export interface Item {
  id: number;
  name: string;
}

// Use in API
import { Item } from '@nx-mono-repo-deployment-test/shared';

// Use in Web
import { Item } from '@nx-mono-repo-deployment-test/shared';
```

## 🔍 IDE Support

### VS Code (Recommended)
- Install "ESLint" extension
- Install "Prettier" extension
- TypeScript support is built-in

### Settings
Add to `.vscode/settings.json`:
```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 🐛 Common Issues

### Issue: "Cannot find module '@nx-mono-repo-deployment-test/shared'"
**Solution:** Build the shared library first
```bash
npm run shared:build
```

### Issue: Type errors in development
**Solution:** Make sure all dependencies are installed
```bash
npm run install:all
```

### Issue: ESLint errors
**Solution:** Fix with ESLint
```bash
cd apps/api && npm run lint --fix
```

### Issue: Build fails
**Solution:** Check TypeScript errors
```bash
npm run type-check
```

## 📊 Type Coverage

- **API**: 100% TypeScript
- **Web**: 100% TypeScript (TSX for React)
- **Shared**: 100% TypeScript

## 🔧 Advanced Configuration

### Adding New Types

**API:**
```typescript
// apps/api/src/types/index.ts
export interface User {
  id: string;
  email: string;
}
```

**Web:**
```typescript
// apps/web/src/types/index.ts
export type Theme = 'light' | 'dark';
```

### Custom Type Definitions

Create `*.d.ts` files for custom modules:
```typescript
// apps/api/src/types/custom.d.ts
declare module 'some-untyped-package' {
  export function doSomething(): void;
}
```

## 🚢 Production Build

TypeScript is compiled before deployment:

1. **API**: `tsc` compiles to `dist/`
2. **Web**: Next.js compiles during build
3. **Docker**: Builds include TypeScript compilation

## 📚 Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript with Express](https://dev.to/asjadanis/building-rest-api-with-express-typescript-4k1l)
- [TypeScript with React](https://react.dev/learn/typescript)
- [Next.js TypeScript](https://nextjs.org/docs/basic-features/typescript)

## ✅ Best Practices

1. ✅ Always define interface/types for data
2. ✅ Use strict mode
3. ✅ Avoid `any` type
4. ✅ Enable all strict checks
5. ✅ Use type inference when obvious
6. ✅ Export shared types from libs/shared
7. ✅ Run type-check before committing
8. ✅ Let TypeScript catch bugs early

---

**TypeScript is now fully integrated!** 🎉

Enjoy type-safe development across your entire monorepo!

