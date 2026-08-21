export function cleanupBrowserStorage() {
  try {
    const keysToCheck = ['draft_wizard_state', 'component_builder_draft', 'clarifyai_draft_autosave'];
    const now = Date.now();

    keysToCheck.forEach((key) => {
      const raw = localStorage.getItem(key);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed.expiresAt && new Date(parsed.expiresAt).getTime() < now) {
            localStorage.removeItem(key);
          }
        } catch {
          localStorage.removeItem(key);
        }
      }
    });

    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('tmp_') || k.startsWith('debug_') || k.startsWith('cache_'))) {
        localStorage.removeItem(k);
      }
    }
  } catch {}
}
