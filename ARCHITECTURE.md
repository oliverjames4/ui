# UI Architecture

## Structure

### File System

The file system is laid out as flat as possible:
- Component packages go under `components/`
- Utility packages under `utilities/`
- Collections under `collections/`

### Monorepo

Be aware that the UI repository is a **monorepo** based on **Yarn Workspaces**, so the setup assumes a working knowledge of how workspaces behave and how to use Yarn.

> **Note**: As of 2021-06-21, we rely on **Yarn 1.x**. Support for Yarn 2.x is currently unverified.

See the `workspaces` key in the root `package.json` to view which packages are part of the workspace.

---

## Conceptual Layers

There are three conceptual layers in the UI, explained below.

---

### 1. Utilities

UI includes several utility packages that are helpful when building user interfaces.

Examples:
- `@dhis2/ui-icons` — Exposes icons as ready-to-use React components to ensure consistent visual language across DHIS2 apps.
- `@dhis2/ui-constants` — Provides constants (e.g., colors, spacing) to maintain theme consistency.

Using these utilities ensures that updates to icons, colors, or spacing propagate consistently across all applications using them.

> You can use UI utilities without using the UI components. They work alongside other frameworks or custom components.

---

### 2. Components

UI components are the building blocks for constructing DHIS2 user interfaces. They aim to cover common use cases out-of-the-box, while allowing for deeper customization.

Following React principles, we rely on **composition**:
- Complex components are built from simpler ones
- Consumers should have access to all building blocks
- Components are **isolated** with well-defined interfaces
- Components must be **reusable** across multiple contexts

> **Note**: Components are published under the `@dhis2-ui/*` scope and will be considered part of the external API once the architecture stabilizes.

> As of 2021-06-21, `@dhis2-ui/*` components are considered **internal** and may include breaking changes without a major version bump.

Each component package:
- Has a logical and semantic scope
- May group related components
- Can be split into smaller packages to avoid circular dependencies or enforce tighter boundaries

To support future extraction:
- Each package includes a `src/index.js` file to define its public exports
- Multi-component packages should structure each subcomponent in its own directory, each with its own `index.js` file:  
  Example: `{component}/src/{subcomponent}/index.js`

> Components should be imported from their respective `index.js` files, not from internal or non-exported parts of the module.

---

### 3. Collections

A **collection** is a group of components and serves as the primary entry point for use in applications.

- The main collection is `@dhis2/ui`, which provides access to all internal components.

> **Note**:
> - `@dhis2/ui-core` and `@dhis2/ui-widgets` are deprecated.
> - These packages will still receive updates for existing components but will not receive new components.
> - They will be removed in a future major release.

---

## Package Scopes and Publishing

UI uses two NPM scopes for publishing:

| Scope            | Purpose                     |
|------------------|-----------------------------|
| `@dhis2/ui-*`    | Collections and utilities   |
| `@dhis2-ui/*`    | Component packages          |

---

