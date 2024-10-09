# Zailee Art Portfolio

This monorepo contains the full-stack application for Zailee's artist portfolio website. It consists of a Nuxt.js frontend and a Strapi backend.

## Project Structure

```
zaileeart/
├── apps/
│   ├── backend/     # Strapi application
│   └── frontend/    # Nuxt.js application
├── packages/        # Shared packages (if any)
└── package.json     # Root package.json for managing the monorepo
```

## Prerequisites

- Node.js (LTS version recommended)
- pnpm (for package management)
- PostgreSQL (for Strapi backend)

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/your-username/zaileeart.git
   cd zaileeart
   ```

## ESLint Configuration

This project uses ESLint to maintain code quality and consistency. Our configuration:

- Extends recommended configs from ESLint and plugins
- Uses Prettier for code formatting
- Enforces consistent indentation, quotes, and semicolon usage
- Checks for common issues like unused variables
- Includes Vue.js specific rules for our Nuxt applications

To run ESLint:

```bash
pnpm run lint
```

To automatically fix issues:

```bash
pnpm run lint:fix
```

ESLint is integrated with our pre-commit hooks to ensure all committed code meets our standards.

For more details, see our ESLint configuration in `packages/eslint-config/src/index.js`. 2. Install dependencies:

```
pnpm install
```

3. Set up environment variables:

   - Copy `.env.example` to `.env` in both `apps/backend` and `apps/frontend` directories
   - Update the variables with your specific configuration

4. Start the development servers:

   ```
   pnpm run dev:backend
   pnpm run dev:frontend
   ```

   The Strapi admin panel will be available at `http://localhost:1338/admin`
   The Nuxt.js frontend will be available at `http://localhost:3000`

## Features

- Responsive design with Memphis-style UI
- Dynamic content management with Strapi
- Server-side rendering with Nuxt.js
- Image optimization and lazy loading
- Contact form functionality
- Blog integration

## Deployment

The project is set up for deployment using CircleCI. The configuration can be found in `.circleci/config.yml`.

To deploy manually:

1. Build the projects:

   ```
   pnpm run build:backend
   pnpm run build:frontend
   ```

2. Start the production servers:
   ```
   pnpm run start:backend
   pnpm run start:frontend
   ```

## Technologies Used

- Frontend:

  - Nuxt.js 3
  - Vue.js 3
  - Tailwind CSS
  - TypeScript

- Backend:

  - Strapi 5
  - PostgreSQL

- DevOps:
  - CircleCI
  - pnpm (package management)
  - Nginx (for production deployment)

## ESLint Configuration

This project uses ESLint to maintain code quality and consistency. Our configuration:

- Extends recommended configs from ESLint and plugins
- Uses Prettier for code formatting
- Enforces consistent indentation, quotes, and semicolon usage
- Checks for common issues like unused variables
- Includes Vue.js specific rules for our Nuxt applications

To run ESLint:

```bash
pnpm run lint
```

To automatically fix issues:

```bash
pnpm run lint:fix
```

ESLint is integrated with our pre-commit hooks to ensure all committed code meets our standards.

For more details, see our ESLint configuration in `packages/eslint-config/src/index.js`.

## Code Formatting with Prettier

This project uses Prettier for code formatting. Prettier is an opinionated code formatter that ensures consistent style across the project.

To format your code:

```bash
pnpm run format
```

To check if your code is formatted correctly:

```bash
pnpm run format:check
```

Prettier is integrated with our pre-commit hooks to ensure all committed code is formatted consistently.

Our Prettier configuration can be found in the `.prettierrc` file at the root of the project.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
