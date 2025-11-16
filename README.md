
# Global Application Structure

This is a code bundle for Global Application Structure. The original project is available at https://www.figma.com/design/5n4XBOyXKCUxRrL5DpDjOD/Global-Application-Structure.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Deployment to Netlify

### Option 1: Deploy via Netlify Dashboard (Recommended)

1. Go to [Netlify](https://app.netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize Netlify
4. Select the repository: `trueinf/mobileflow`
5. Netlify will auto-detect the build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
6. Click "Deploy site"

The site will be automatically deployed and will update on every push to the main branch.

### Option 2: Deploy via Netlify CLI

If you have Netlify CLI installed and authenticated:

```bash
npm run build
netlify deploy --prod --dir=build
```

### Build Configuration

The project includes a `netlify.toml` file with the following settings:
- Build command: `npm run build`
- Publish directory: `build`
- SPA redirects configured for client-side routing
  