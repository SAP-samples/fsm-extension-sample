# SAP Field Service and Asset Management - Token Refresh Sample (SAP UI5)

This is an SAP Field Service and Asset Management extension project demonstrating how to handle token refresh and display authentication tokens in real-time using SAP UI5.

**Do not use this sample or parts in your productive code**. It should be used only as a reference, since it does not follow any particular security, performance, or quality standards.
**There will not be support if you use code from this project in your productive environment**.

## Architecture

- **Framework**: SAP UI5 with TypeScript
- **Language**: TypeScript with strict mode
- **UI Components**: SAP UI5 controls (TextArea, MessageStrip, etc.)
- **Data Binding**: JSON Model for reactive UI updates
- **SAP Field Service and Asset Management Shell SDK**: Official SDK for SAP Field Service and Asset Management extensions. It handles authentication, context, and event communication with the SAP Field Service and Asset Management platform
- **UI Display**: Real-time token history with timestamps in a growing TextArea

## Working with the Sample

### Prerequisites

- An account in SAP BTP
- Access to SAP Field Service and Asset Management

### Step by Step

1. Install the project's dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

   The UI5 application will be served locally. Any changes to TypeScript or view files will trigger recompilation.

3. Build for production:

   ```bash
   npm run build
   ```

   This generates optimized UI5 files ready for deployment.

4. Deploy the extension to SAP Field Service and Asset Management and access it through the SAP Field Service and Asset Management Shell to see token refresh in action

## Project Structure

```bash
token-refresh-sample-ui5/
├── webapp/                       # UI5 application source
│   ├── Component.ts              # UI5 Component initialization
│   ├── manifest.json             # App descriptor (UI5 manifest)
│   ├── index.html                # HTML entry point
│   │
│   ├── controller/               # UI5 Controllers
│   │   ├── App.controller.ts     # Main app controller
│   │   └── View1.controller.ts   # View controller with token subscription logic
│   │
│   ├── view/                     # UI5 XML Views
│   │   ├── App.view.xml          # Main app view
│   │   └── View1.view.xml        # Main view with TextArea for token display
│   │
│   ├── model/                    # Data models
│   │   └── models.ts             # JSON model initialization
│   │
│   ├── util/                     # Utility services
│   │   ├── shell-sdk.service.ts  # SAP Field Service and Asset Management Shell SDK service wrapper
│   │   └── util.ts               # Common utilities
│   │
│   ├── i18n/                     # Internationalization
│   │   └── i18n.properties       # Text resources
│   │
│   └── css/                      # Stylesheets
│       └── style.css             # Custom styles
│
├── index.html                    # Root HTML file
├── manifest.json                 # Root manifest
├── mta.yaml                      # Multi-Target Application descriptor
├── ui5.yaml                      # UI5 Tooling configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

## Configuration

### UI5 Tooling Configuration (`ui5.yaml`)

The project uses UI5 Tooling for development and build processes:

- **Spec Version**: 4.0
- **Type**: Application
- **Custom Middlewares** (Development):
  - `fiori-tools-proxy`: Proxies UI5 resources from CDN
  - `fiori-tools-appreload`: Live reload on file changes
  - `fiori-tools-preview`: Fiori Launchpad preview
  - `ui5-tooling-transpile-middleware`: Transpiles TypeScript and modern JavaScript
  - `ui5-tooling-modules-middleware`: Handles npm dependencies (e.g., fsm-shell)

- **Custom Build Tasks**:
  - `ui5-tooling-transpile-task`: Transpilation during build
  - `ui5-tooling-modules-task`: Module bundling for dependencies

### MTA Configuration (`mta.yaml`)

Multi-Target Application descriptor for SAP BTP Cloud Foundry deployment:

**Modules**:

- `ui5extension`: HTML5 application module
- `ui5extension-app-content`: Application content deployer
- `ui5extension-destination-content`: Destination configuration

**Resources** (SAP BTP Services):

- `ui5extension-uaa`: XSUAA service for authentication (uses xs-security.json)
- `ui5extension-repo-host`: HTML5 Application Repository service
- `ui5extension-destination-service`: Destination service for external connections

**Deploy Mode**: html5-repo (deployed to HTML5 Application Repository)

### TypeScript Configuration (`tsconfig.json`)

- **Target**: ES2022
- **Module**: ES2022
- **Strict Mode**: Enabled
- **Module Resolution**: Node
- **Root Directory**: `./webapp`
- **Output Directory**: `./dist`
- **UI5 Types**: Included via @sapui5/types for type checking
- **Path Mappings**: Configured for UI5 module resolution and test paths

## Deployment Options

### Deploying to Netlify

The project includes a `netlify.toml` configuration file for easy deployment:

**- Option 1**: GitHub Integration

- Push your code to GitHub
- Go to [app.netlify.com](https://app.netlify.com) and login with GitHub
- Click "Add new site" → "Import an existing project"
- Select "GitHub" and choose your repository
- Netlify will use the `netlify.toml` configuration automatically
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

Netlify will use the `netlify.toml` configuration automatically.

**- Option 3**: Drag & Drop

- Run `npm run build` locally (required - manual build needed for this option)
- Go to [app.netlify.com/drop](https://app.netlify.com/drop)
- Drag the `dist` folder to deploy

Quick deploy for testing, but lacks Git integration.

### Deploying to SAP BTP Cloud Foundry

This sample can be easily deployed to SAP BTP Cloud Foundry.

**- Option 1**: Using SAP Business Application Studio (Recommended)

- Open the project in SAP BAS
- Right-click on the `mta.yaml` file
- Select "Build MTA Project" to create the MTA archive
- Once built, right-click on the generated `.mtar` file in `mta_archives/`
- Select "Deploy MTA Archive" and choose your Cloud Foundry space
- The application will be deployed with all required services (XSUAA, HTML5 App Repository, Destinations)
- After successful deployment, the sample is hosted in the HTML5 Application Repository. To access it:
  - From SAP BTP Cockpit, navigate to your **Subaccount** → **HTML5 Applications**
  - Find `ui5extension` in the list
  - Click on the application name to open it in a new tab

**- Option 2**: Using CF CLI Locally

If you prefer to deploy from your local machine:

- Install the CF CLI if not yet installed: <https://github.com/cloudfoundry/cli>
- Install the MultiApps CF CLI Plugin: `cf install-plugin multiapps`
- Login to your CF space: `cf login -a <API_ENDPOINT> -o <ORG> -s <SPACE>`
- Build the MTA: `npm run build:mta`
- Deploy: `cf deploy mta_archives/ui5extension_0.0.1.mtar`
- Get the application URL: `cf html5-list -di ui5extension-destination-service -u`

The URL will typically follow this pattern:

```bash
https://<subaccount-subdomain>.launchpad.cfapps.<region>.hana.ondemand.com/<app-id>
```

## Next Steps

For more information about installing and placing extensions:

- [Manual Installation of an Extension](https://help.sap.com/docs/SAP_FIELD_SERVICE_MANAGEMENT/fsm_extensions/install-manually.html)
- [Placing an Extension App](https://help.sap.com/docs/SAP_FIELD_SERVICE_MANAGEMENT/fsm_extensions/place-an-extension-app.html)

## License

See LICENSE file in the root of the repository.
