import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { panelHost } from "@tracht-digital-solutions/tds-panel-contract/astro";
import { corePanelBase } from "@tracht-digital-solutions/tds-core-panel-frontend/astro";
import { tdsViteBuild } from "@tracht-digital-solutions/tds-shared/astro";

// The customer-portal extension set — customer-facing only. corePanelBase injects
// the shared base routes; panelHost injects each extension's route + virtuals.
import supportTickets from "@tracht-digital-solutions/tds-ext-support-tickets";
import billing from "@tracht-digital-solutions/tds-ext-billing";

const extensions = [supportTickets, billing];

// This product builds as the CUSTOMER target (shell auth-hint key + brand).
process.env.PANEL_TARGET = "customer";
process.env.PUBLIC_PANEL_TARGET = "customer";
// Login is the central site (auth.tracht-digital.de) — the host bounces there.
// The host defaults PUBLIC_LOGIN_URL; set it in the build env to override (e.g.
// the local tds-auth dev server).

export default defineConfig({
  output: "static",
  integrations: [react(), corePanelBase(), panelHost({ extensions })],
  trailingSlash: "ignore",
  build: { format: "directory" },
  vite: { build: { ...tdsViteBuild } },
});
