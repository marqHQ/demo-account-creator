# Product Hub Integration Guide

## Overview
This guide will help you integrate the Marq Demo Creator into the Product Hub monorepo.

## Prerequisites
- Product Hub repo cloned locally
- This demo creator project ready for integration

## Integration Steps

### 1. Prepare the Environment
```bash
# Navigate to your projects directory
cd "/path/to/your/projects"

# Ensure both repos are present
ls -la
# Should see: marq-demo-creator/ and product-hub/
```

### 2. Run the Integration Script
```bash
# Make the script executable and run it
chmod +x marq-demo-creator/prepare-for-product-hub.sh
./marq-demo-creator/prepare-for-product-hub.sh
```

### 3. Update Product Hub Configuration

#### Option A: If Product Hub uses npm workspaces
Add to `product-hub/package.json`:
```json
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

#### Option B: If Product Hub uses a monorepo tool (Lerna, Nx, etc.)
Follow their specific configuration requirements.

### 4. Vercel Deployment Configuration

#### For Multiple Apps on Same Domain
Copy `vercel-monorepo-config.json` to `product-hub/vercel.json` and customize:
```json
{
  "builds": [
    {
      "src": "apps/demo-creator/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "rewrites": [
    {
      "source": "/demo-creator/:path*",
      "destination": "/apps/demo-creator/:path*"
    }
  ]
}
```

#### For Separate Vercel Projects
1. Create new Vercel project for demo creator
2. Set **Root Directory** to `apps/demo-creator`
3. Build command: `npm run build`
4. Output directory: `dist`

### 5. Update Build Scripts

In `product-hub/package.json`, add:
```json
{
  "scripts": {
    "build:demo-creator": "cd apps/demo-creator && npm run build",
    "dev:demo-creator": "cd apps/demo-creator && npm run dev",
    "install:all": "npm install && cd apps/demo-creator && npm install"
  }
}
```

### 6. Shared Dependencies (Optional)
Move common dependencies to the root `package.json`:
- React, React-DOM
- TypeScript
- Tailwind CSS
- Vite

Update `apps/demo-creator/package.json` to use workspace dependencies:
```json
{
  "dependencies": {
    "react": "workspace:*",
    "react-dom": "workspace:*"
  }
}
```

## Navigation Integration

### Option 1: Standalone Tool
Access via: `yourdomain.com/demo-creator`

### Option 2: Hub Integration
Add to Product Hub navigation:
```jsx
// In your hub navigation component
const tools = [
  {
    name: 'Demo Creator',
    href: '/demo-creator',
    icon: PackageIcon,
    description: 'Create and manage demo accounts'
  }
  // ... other tools
]
```

## Development Workflow

### Local Development
```bash
# From Product Hub root
npm run dev:demo-creator

# Or develop all apps simultaneously
npm run dev
```

### Production Deployment
```bash
# Build all apps
npm run build

# Or just demo creator
npm run build:demo-creator
```

## File Structure After Integration
```
product-hub/
├── apps/
│   ├── demo-creator/          # This project
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── other-tools/
├── packages/                  # Shared packages
├── package.json              # Root package.json
├── vercel.json               # Deployment config
└── README.md
```

## Testing the Integration

1. **Install dependencies:**
   ```bash
   cd product-hub
   npm install
   cd apps/demo-creator
   npm install
   ```

2. **Test development server:**
   ```bash
   cd apps/demo-creator
   npm run dev
   ```

3. **Test build process:**
   ```bash
   npm run build
   ```

4. **Verify routing (if using hub navigation):**
   - Ensure demo creator routes don't conflict with hub routes
   - Test navigation between hub and demo creator

## Environment Variables

If demo creator uses environment variables, add them to:
- `.env.local` for local development
- Vercel dashboard for production
- GitHub secrets for CI/CD

## Troubleshooting

### Common Issues:

1. **Build fails due to dependencies:**
   - Ensure all dependencies are installed in correct locations
   - Check for version conflicts

2. **Routing conflicts:**
   - Verify route prefixes don't overlap
   - Update base URL in Vite config if needed

3. **Vercel deployment issues:**
   - Check build output directory matches Vercel config
   - Verify root directory is set correctly

### Support
If you encounter issues, check:
- Product Hub existing structure
- Vercel documentation for monorepos
- Existing deployment scripts

## Next Steps After Integration

1. **Update documentation** in Product Hub README
2. **Add demo creator to CI/CD pipeline**
3. **Set up monitoring** for the new tool
4. **Update team access permissions**
5. **Consider shared component library** for consistent UI