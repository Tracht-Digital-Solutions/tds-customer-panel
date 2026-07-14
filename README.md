# tds-customer-panel

**Deploy target for the customer portal** (`app.tracht-digital.de`).

The customer portal is a **build of `tds-core-panel-frontend`** with the
**`PANEL_TARGET=customer`** product target — the same base host, the
customer-facing extension set (currently support-tickets), the customer auth hint
key, and the "Portal" brand. No separate app codebase.

## Build

```bash
# in tds-core-panel-frontend:
npm install
PANEL_TARGET=customer npm run build
# → dist/ deploys to app.tracht-digital.de
```

- Enabled extensions: `tds-core-panel-frontend/astro.config.mjs` (customer branch).
- Auth hint key: `tds_customer_*`; brand suffix: "Portal" (`src/config/target.ts`).
  The session cookie is shared (`Domain=.tracht-digital.de`), so a principal with
  access is SSO'd across the admin panel + this portal.
- Env: `PUBLIC_AUTH_API_URL`, `PUBLIC_API_BASE` → `api.tracht-digital.de/*`.

## This repo

Holds the customer portal's **deploy config + secrets**. The static `dist/` comes
from `tds-core-panel-frontend`; a deploy workflow (or host Git pull) publishes it
to the customer domain. The sibling `tds-admin-panel` is the same core built with
the default (admin) target.
