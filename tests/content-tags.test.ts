/**
 * Catálogo de tags de contenido (F3.2).
 *
 * El catálogo debe ser IDÉNTICO al que `proefex-api` deriva y enviará al Web en
 * A5 (`content:<tipo>`, `content:<tipo>:<slug|home>`, `content:navigation`,
 * `content:settings`). Si estos tests fallan, la invalidación futura no
 * coincidiría con lo que el API publica.
 */

import assert from "node:assert/strict";
import { test } from "node:test";

import {
  CONTENT_TAG_PREFIX,
  HOME_CONTENT_SLUG,
  NAVIGATION_CONTENT_TAG,
  SETTINGS_CONTENT_TAG,
  contentEntryTag,
  contentEntryTags,
  contentListTags,
  contentTypeTag,
  navigationTags,
  normalizeContentSlug,
  settingsTags,
} from "../src/lib/content/tags.ts";
import { CONTENT_TYPES, CONTENT_SLUG_PATTERN } from "../src/lib/api/types.ts";

test("los tags de listado y de entidad siguen la nomenclatura del API", () => {
  assert.equal(CONTENT_TAG_PREFIX, "content");
  assert.equal(contentTypeTag("cases"), "content:cases");
  assert.equal(contentEntryTag("cases", "planta-industrial"), "content:cases:planta-industrial");
  assert.deepEqual(contentListTags("products"), ["content:products"]);
  assert.deepEqual(contentEntryTags("cases", "planta-industrial"), [
    "content:cases",
    "content:cases:planta-industrial",
  ]);
});

test("los singleton usan los tags reservados del API", () => {
  assert.equal(NAVIGATION_CONTENT_TAG, "content:navigation");
  assert.equal(SETTINGS_CONTENT_TAG, "content:settings");
  assert.deepEqual(navigationTags(), ["content:navigation"]);
  assert.deepEqual(settingsTags(), ["content:settings"]);
});

test("la home del CMS (slug vacío) se publica como content:<tipo>:home", () => {
  assert.equal(normalizeContentSlug(""), HOME_CONTENT_SLUG);
  assert.deepEqual(contentEntryTags("pages", ""), ["content:pages", "content:pages:home"]);
});

test("todos los tipos del contrato producen tags válidos y únicos", () => {
  for (const type of CONTENT_TYPES) {
    const tags = contentEntryTags(type, "ejemplo");
    assert.equal(new Set(tags).size, tags.length, `tags duplicados en ${type}`);
    for (const tag of tags) {
      assert.match(tag, /^content:[a-z]+(:[a-z0-9/-]+)?$/, `tag fuera de nomenclatura: ${tag}`);
    }
  }
});

test("el slug normalizado de una entidad pasa el patrón de slug del contrato", () => {
  for (const type of CONTENT_TYPES) {
    assert.equal(CONTENT_SLUG_PATTERN.test(normalizeContentSlug("")), true);
  }
});
