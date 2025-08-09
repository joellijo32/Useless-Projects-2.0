// Simple Express + SQLite backend for WhyChewThis
import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import Database from 'better-sqlite3'
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
// Allow requests from your Vercel site
app.use(cors({
  origin: "*"
}))
app.use(express.json())

// Choose DB file: prefer provided full dataset if available
const providedDbPath = path.join(__dirname, 'backend', 'inedible_calories.db')
const altProvidedDbPath = path.join(__dirname, 'inedible_calories.db')
const defaultDbPath = path.join(__dirname, 'db.sqlite')
const envDbPath = process.env.DB_FILE

const chosenDbPath = [envDbPath, providedDbPath, altProvidedDbPath, defaultDbPath]
  .filter(Boolean)
  .find(p => { try { return fs.existsSync(p) } catch { return false } }) || defaultDbPath

let db
try {
  db = new Database(chosenDbPath)
  console.log('Using SQLite DB:', chosenDbPath)
} catch (err) {
  console.error('Failed to open SQLite database:', err.message)
  process.exit(1)
}

// If we're on the default dev DB, ensure schema exists and seed minimal data (fallback only)
if (path.basename(chosenDbPath) === path.basename(defaultDbPath)) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS inedible_items (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      emoji TEXT,
      category TEXT,
      caloriesPerUnit INTEGER NOT NULL
    );
  `)
  const countRow = db.prepare('SELECT COUNT(1) as cnt FROM inedible_items').get()
  if ((countRow?.cnt ?? 0) === 0) {
    const seedItems = [
      { id: 1, name: 'Rubber Duck', emoji: '🦆', category: 'Household', caloriesPerUnit: 42 },
      { id: 2, name: 'Paperclip', emoji: '📎', category: 'Office', caloriesPerUnit: 3 },
      { id: 3, name: 'Keyboard Keycap', emoji: '⌨️', category: 'Gadgets', caloriesPerUnit: 18 },
      { id: 4, name: 'Sock (Single)', emoji: '🧦', category: 'Clothing', caloriesPerUnit: 55 },
      { id: 5, name: 'USB Drive', emoji: '💾', category: 'Gadgets', caloriesPerUnit: 25 },
      { id: 6, name: 'Candle', emoji: '🕯️', category: 'Home', caloriesPerUnit: 120 },
      { id: 7, name: 'Plastic Spoon', emoji: '🥄', category: 'Kitchen', caloriesPerUnit: 8 },
      { id: 8, name: 'Sticky Note', emoji: '📝', category: 'Office', caloriesPerUnit: 2 },
    ]
    const insert = db.prepare('INSERT INTO inedible_items (id, name, emoji, category, caloriesPerUnit) VALUES (@id, @name, @emoji, @category, @caloriesPerUnit)')
    const insertMany = db.transaction((items) => {
      for (const it of items) insert.run(it)
    })
    insertMany(seedItems)
    console.log(`Seeded ${seedItems.length} inedible items (dev fallback DB)`)
  }
}

// Introspect DB to find a suitable table/columns for items
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all()
const tableInfo = {}
for (const t of tables) {
  try {
  const cols = db.prepare(`PRAGMA table_info("${t.name.replaceAll('"', '""')}")`).all()
    tableInfo[t.name] = cols
  } catch {}
}

function findColumn(cols, candidates) {
  const lcCols = cols.map(c => c.name.toLowerCase())
  for (const cand of candidates) {
    const idx = lcCols.indexOf(cand)
    if (idx !== -1) return cols[idx].name
  }
  // also allow substring match
  for (const cand of candidates) {
    const idx = lcCols.findIndex(n => n.includes(cand))
    if (idx !== -1) return cols[idx].name
  }
  return null
}

function pickItemsSource() {
  // Prefer likely tables by name
  const tableOrder = Object.keys(tableInfo).sort((a, b) => {
    const score = (n) => (/inedible/i.test(n) ? 2 : 0) + (/object|item|things?/i.test(n) ? 1 : 0)
    return score(b) - score(a)
  })

  const nameCands = ['name', 'item', 'item_name', 'object', 'thing', 'title', 'label']
  const calCands = ['caloriesperunit', 'calories_per_unit', 'cal_per_unit', 'kcal', 'calorie', 'calories', 'kcals', 'calorievalue', 'calorie_value', 'energy']
  const emojiCands = ['emoji', 'icon']
  const catCands = ['category', 'type', 'group', 'class']
  const idCands = ['id', 'item_id', 'uid']

  function sampleRows(table, limit = 300) {
    try {
      const q = `SELECT rowid as __rid__, * FROM "${table.replaceAll('"', '""')}" LIMIT ${limit}`
      return db.prepare(q).all()
    } catch {
      return []
    }
  }

  function chooseNameCol(cols, rows) {
    const nameCands = ['name', 'item', 'item_name', 'object', 'thing', 'title', 'label', 'description']
    const direct = findColumn(cols, nameCands)
    if (direct) return direct
    // pick text-like column with highest avg length and high distinctness
    let best = null
    for (const c of cols) {
      const values = rows.map(r => r[c.name]).filter(v => v != null)
      const strings = values.map(v => String(v))
      const avgLen = strings.length ? strings.reduce((a, s) => a + s.length, 0) / strings.length : 0
      const distinct = new Set(strings).size
      const score = avgLen + distinct * 0.1
      if (!best || score > best.score) best = { name: c.name, score }
    }
    return best?.name || null
  }

  function chooseCalCol(cols, rows) {
    const calCands = ['caloriesperunit', 'calories_per_unit', 'cal_per_unit', 'kcal', 'calorie', 'calories', 'kcals', 'calorievalue', 'calorie_value', 'energy']
    const direct = findColumn(cols, calCands)
    if (direct) return direct
    // evaluate all columns for numeric parse success
    let best = null
    for (const c of cols) {
      let numericCount = 0
      let nonZero = 0
      for (const r of rows) {
        const val = r[c.name]
        if (val == null) continue
        const num = Number(String(val).replace(/[^0-9.+-]/g, ''))
        if (!Number.isNaN(num)) {
          numericCount++
          if (num !== 0) nonZero++
        }
      }
      const score = numericCount + nonZero * 0.5
      if (!best || score > best.score) best = { name: c.name, score }
    }
    return best?.name || null
  }

  for (const t of tableOrder) {
    const cols = tableInfo[t]
    const rows = sampleRows(t)
    if (!rows.length) continue
    const nameCol = chooseNameCol(cols, rows)
    const calCol = chooseCalCol(cols, rows)
    const idCol = findColumn(cols, idCands) || (cols.find(c => c.pk === 1)?.name || null)
    const emojiCol = findColumn(cols, emojiCands)
    const catCol = findColumn(cols, catCands)
    if (nameCol && calCol) {
      const m = { table: t, idCol, nameCol, emojiCol, catCol, calCol }
      console.log('Detected items table mapping:', m)
      return m
    }
  }
  // fallback to our known table if exists
  if (tableInfo['inedible_items']) {
    const m = { table: 'inedible_items', idCol: 'id', nameCol: 'name', emojiCol: 'emoji', catCol: 'category', calCol: 'caloriesPerUnit' }
    console.log('Using fallback mapping:', m)
    return m
  }
  // last resort: generic mapping on first table, prefer text for name and any column with 'cal' for calories
  const anyTable = Object.keys(tableInfo)[0]
  if (anyTable) {
    const cols = tableInfo[anyTable]
    const nameCol = findColumn(cols, nameCands) || cols.find(c => /text|char|clob/i.test(c.type || ''))?.name || cols[0]?.name
    const calCol = findColumn(cols, calCands) || cols.find(c => /int|real|num|float|double/i.test(c.type || ''))?.name || cols[0]?.name
    const idCol = cols.find(c => c.pk === 1)?.name || null
    const m = { table: anyTable, idCol, nameCol, emojiCol: null, catCol: null, calCol }
    console.log('Using generic mapping:', m)
    return m
  }
  return null
}

const source = pickItemsSource()
if (!source) {
  console.warn('Warning: Could not auto-detect items table. Endpoints may return seeded fallback only if available.')
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.get('/api/items', (req, res) => {
  try {
    if (source) {
      // include rowid for stable ids when no explicit id
      const rows = db.prepare(`SELECT rowid as __rid__, * FROM "${source.table.replaceAll('"', '""')}"`).all()
      const items = rows.map((r, idx) => ({
        id: source.idCol ? r[source.idCol] : r.__rid__ || idx + 1,
        name: r[source.nameCol],
        emoji: source.emojiCol ? (r[source.emojiCol] || '📦') : '📦',
        category: source.catCol ? (r[source.catCol] || 'Misc') : 'Misc',
        caloriesPerUnit: Number(String(r[source.calCol]).replace(/[^0-9.+-]/g, '')) || 0,
      }))
      return res.json(items)
    }
    // fallback to known table (dev db)
    const items = db.prepare('SELECT id, name, emoji, category, caloriesPerUnit FROM inedible_items ORDER BY id').all()
    res.json(items)
  } catch (err) {
    console.error('Error fetching items:', err)
    res.status(500).json({ error: 'Failed to fetch items' })
  }
})

app.get('/api/items/:id', (req, res) => {
  try {
    const id = Number(req.params.id)
    if (source && source.idCol) {
  const row = db.prepare(`SELECT * FROM "${source.table.replaceAll('"', '""')}" WHERE "${source.idCol.replaceAll('"', '""')}" = ?`).get(id)
      if (!row) return res.status(404).json({ error: 'Not found' })
      const item = {
        id: row[source.idCol],
        name: row[source.nameCol],
        emoji: source.emojiCol ? (row[source.emojiCol] || '📦') : '📦',
        category: source.catCol ? (row[source.catCol] || 'Misc') : 'Misc',
        caloriesPerUnit: Number(String(row[source.calCol]).replace(/[^0-9.+-]/g, '')) || 0,
      }
      return res.json(item)
    }
    const item = db.prepare('SELECT id, name, emoji, category, caloriesPerUnit FROM inedible_items WHERE id = ?').get(id)
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.json(item)
  } catch (err) {
    console.error('Error fetching item:', err)
    res.status(500).json({ error: 'Failed to fetch item' })
  }
})

// Optional: server-side bill calculation
app.post('/api/bill/calc', (req, res) => {
  try {
    const items = Array.isArray(req.body?.items) ? req.body.items : []
    let total = 0
    for (const row of items) {
      const id = Number(row.id)
      const qty = Math.max(0, Math.min(100, Number(row.quantity) || 0))
      if (source && source.idCol) {
        const it = db.prepare(`SELECT ${source.calCol} as cal FROM ${source.table} WHERE ${source.idCol} = ?`).get(id)
        if (it) total += (Number(it.cal) || 0) * qty
      } else {
        const it = db.prepare('SELECT caloriesPerUnit as cal FROM inedible_items WHERE id = ?').get(id)
        if (it) total += (Number(it.cal) || 0) * qty
      }
    }
    res.json({ total })
  } catch (err) {
    console.error('Error calculating bill:', err)
    res.status(500).json({ error: 'Failed to calculate bill' })
  }
})

const PORT = process.env.PORT || 5175
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`)
})
