const STORAGE_KEY = "transition-labels"

function getStore(): Record<string, string> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveStore(store: Record<string, string>) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    
  }
}

export function saveLabelForUrl(url: string, label: string) {
  const store = getStore()
  store[url] = label
  saveStore(store)
}

export function getLabelForUrl(url: string): string | null {
  const store = getStore()
  return store[url] ?? null
}
