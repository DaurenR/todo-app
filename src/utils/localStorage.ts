export const loadState = <T>(key: string, defaultValue: T): T => {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : defaultValue
  } catch (error) {
    console.error("Error loading from LocalStorage:", error)
    return defaultValue
  }
}

export const saveState = (key: string, state: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(state))
  } catch (error) {
    console.error("Error saving to LocalStorage:", error)
  }
}
