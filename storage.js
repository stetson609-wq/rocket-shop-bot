import fs from "fs"

export function readJSON(file, fallback = []) {
  try {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, JSON.stringify(fallback, null, 2))
      return fallback
    }

    return JSON.parse(fs.readFileSync(file))
  } catch {
    return fallback
  }
}

export function writeJSON(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
  } catch (err) {
    console.error("Write error:", err)
  }
}
