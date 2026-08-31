import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

// Module-level cache so all pages share a single fetch of SiteContent records.
let cache = null;
let fetchPromise = null;

async function loadAll() {
  if (cache) return cache;
  if (!fetchPromise) {
    fetchPromise = base44.entities.SiteContent
      .list()
      .then((records) => {
        const map = {};
        (records || []).forEach((r) => {
          if (r.page_key) map[r.page_key] = r;
        });
        cache = map;
        return cache;
      })
      .catch(() => {
        cache = {};
        return cache;
      });
  }
  return fetchPromise;
}

// Returns the saved override record for a page key, or null if none exists.
// The public site falls back to its own static defaults when this is null.
export function useSiteContent(pageKey) {
  const [record, setRecord] = useState(null);

  useEffect(() => {
    if (!pageKey) return;
    let active = true;
    loadAll().then((map) => {
      if (active) setRecord(map[pageKey] || null);
    });
    return () => {
      active = false;
    };
  }, [pageKey]);

  return record;
}

// Invalidate the cache after an admin save so the next public page load is fresh.
export function invalidateSiteContentCache() {
  cache = null;
  fetchPromise = null;
}