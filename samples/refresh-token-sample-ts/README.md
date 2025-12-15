# SAP Field Service Management - Refresh Token Sample

This is an SAP Field Service Management extension project demonstrating how to handle token refresh.

**Do not use this samples or parts of your productive code**. It is just a reference, since it does not follow any particular security, performance, or quality standards. **There will be no support if you use code from this project in your productive environment**.

## Architecture

- **Build Tool**: Vite 5 (modern fast bundler)
- **Language**: TypeScript with strict mode
- **Module System**: ES Modules (ESNext)
- **Development**: Hot Module Replacement (HMR) with instant reload
- **Production**: Optimized build with code splitting and minification
- **FSM Shell SDK**: Official SDK for FSM extensions. It handles authentication, context, and event communication with the FSM platform

## Working with the Sample

### Prerequisites

- Node.js installed (v22 or higher recommended)
- Access to SAP Field Service Management

### Step by Step

1. Install the project's dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

   The project will be compiled and served at <http://localhost:3003>. Any changes to TypeScript files will automatically trigger recompilation.

3. Build for production:

   ```bash
   npm run build
   ```

   This generates optimized files in `dist/` ready for deployment.

4. (Optional) Preview the production build locally:

   ```bash
   npm run preview
   ```

## Project Structure

```bash
refresh-token-sample-ts/
├── src/                          # Source files
│   ├── index.html                # HTML entry point
│   ├── index.ts                  # Main application logic and UI updates
│   ├── extension.controller.ts   # Extension controller with token refresh logic
│   ├── util/
│   │   └── util.ts               # BehaviorSubject implementation
│   └── styles/
│       └── style.css             # Application styles
│
├── dist/                         # Production build (generated)
│   ├── index.html
│   ├── assets/
│   │   ├── index-[hash].js       # Bundled and minified JS
│   │   └── index-[hash].css      # Bundled and minified CSS
│   └── appconfig.json
│
├── includes/
│   └── mime.types.conf           # MIME types configuration for static file server
│
├── .cfignore                     # Files to ignore in Cloud Foundry deployment
├── manifest.yml                  # Cloud Foundry deployment configuration
├── Staticfile                    # Static buildpack configuration for CF
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

## Configuration

### Vite Configuration (`vite.config.ts`)

```typescript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',                    // Source directory
  build: {
    outDir: '../dist',            // Output directory
    emptyOutDir: true,            // Clean before build
    sourcemap: false,             // Disable sourcemaps in production
    rollupOptions: {
      input: resolve(__dirname, 'src/index.html')
    }
  },
  server: {
    port: 3003,                   // Dev server port
    open: false                   // Don't auto-open browser
  }
});
```

### TypeScript Configuration (`tsconfig.json`)

- **Target**: ES2020
- **Module**: ESNext (for Vite bundler mode)
- **Strict Mode**: Enabled
- **Module Resolution**: bundler (optimized for Vite)
- **Type Checking**: `noEmit: true` (Vite handles compilation)

## Available Scripts

### Development

```bash
npm run dev
```

Starts Vite development server at <http://localhost:3003> with:

- Hot Module Replacement (HMR)
- Instant TypeScript compilation
- Automatic browser reload on file changes
- Source maps for debugging

### Production Build

```bash
npm run build
```

Creates optimized production build in `dist/`:

1. Type checks with `tsc`
2. Bundles and minifies code with Vite
3. Optimizes assets (images, CSS, JS)
4. Generates hashed filenames for cache busting
5. Creates source maps

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing before deployment.

## Deployment Options

### Deploying to Vercel

**- Option 1**: Github Integration

- Push your code to GitHub
- Go to [vercel.com](https://vercel.com) and login with GitHub
- Click "Add New Project" → "Import Git Repository"
- Select your repository
- Vercel auto-detects: Framework (Vite), Build Command (`npm run build`), Output Directory (`dist`)
- Click "Deploy"

It will automatically deploy on every `git push`.

**- Option 2**: Vercel CLI

```bash
# Install CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

Vercel will prompt for configuration (auto-detected for Vite projects).

**- Option 3**: Drag & Drop

- Run `npm run build` locally
- Go to [vercel.com/new](https://vercel.com/new)
- Drag the `dist/` folder to deploy

Quick deploy for testing, but it lacks Git integration.

### Deploying to Netlify

**- Option 1**: GitHub Integration

- Push your code to GitHub
- Go to [app.netlify.com](https://app.netlify.com) and login with GitHub
- Click "Add new site" → "Import an existing project"
- Select "GitHub" and choose your repository
- Netlify auto-detects: Build Command (`npm run build`), Publish Directory (`dist`)
- Click "Deploy site"

It will automatically deploy on every `git push`.

**- Option 2**: Netlify CLI

```bash
# Install CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize and deploy
netlify init
netlify deploy --prod
```

Netlify will prompt for configuration (auto-detected for Vite projects).

**- Option 3**: Drag & Drop

- Run `npm run build` locally
- Go to [app.netlify.com/drop](https://app.netlify.com/drop)
- Drag the `dist/` folder to deploy

Quick deploy for testing, but ot lacks Git integration.

### Deploying to SAP BTP Cloud Foundry

If you have a SAP BTP CF account, this sample can be deployed to a CF space:

- Install the CF CLI if not yet installed <https://github.com/cloudfoundry/cli>
- Login to the corresponding space and org using `cf login -a <API_ENDPOINT> -o <ORG> -s <SPACE>`
- Run `cf push` and `cf apps` to get the url where the sample is served.

### Next Steps

For more information about installing and placing extensions:

- [Manual Installation of an Extension](https://help.sap.com/viewer/fsm_extensions/Cloud/en-US/install-manually.html)
- [Placing an Extension App](https://help.sap.com/viewer/fsm_extensions/Cloud/en-US/place-an-extension-app.html)
