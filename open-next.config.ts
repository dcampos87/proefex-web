import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * Config mínima: sitio SSG sin revalidación (A4 se cumple prerenderizando),
 * sin incremental cache R2, sin queue ni tag cache. Se ampliará en la fase
 * CMS/API (webhook A5 + ISR) según docs/opennext caching.
 */
export default defineCloudflareConfig({});
