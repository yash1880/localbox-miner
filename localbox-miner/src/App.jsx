import { useState, useEffect } from 'react'
import RecordForm from './components/RecordForm'
import RecordList from './components/RecordList'
import './App.css'

const STORAGE_KEY = 'localbox_records'

function loadFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

function App() {
  const [records, setRecords] = useState(loadFromStorage)
  const [editId, setEditId] = useState(null)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [filterCategory, setFilterCategory] = useState('All')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  }, [records])

  function addRecord(record) {
    setRecords(prev => [record, ...prev])
  }

  function updateRecord(updated) {
    setRecords(prev => prev.map(r => (r.id === updated.id ? updated : r)))
    setEditId(null)
  }

  function deleteRecord(id) {
    setRecords(prev => prev.filter(r => r.id !== id))
    if (editId === id) setEditId(null)
  }

  function startEdit(id) {
    setEditId(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function clearAllRecords() {
    setRecords([])
    setEditId(null)
    setShowClearConfirm(false)
    setFilterCategory('All')
  }

  const editTarget = editId ? records.find(r => r.id === editId) : null
  const categories = ['All', 'Work', 'Personal', 'Finance', 'Health', 'Other']
  const filtered =
    filterCategory === 'All'
      ? records
      : records.filter(r => r.category === filterCategory)

  const lastAdded = records[0]
  const storageSize = new Blob([JSON.stringify(records)]).size

  return (
    <div>
      {/* Header */}
      <div className="app-header">
        <div>
          <h1 className="app-title">LocalBox Miner</h1>
          <p className="app-subtitle">Offline-first data manager · all data lives in your browser</p>
        </div>
        <div className="storage-badge">
          <span className="storage-dot" />
          localStorage
        </div>
      </div>

      {/* Dashboard summary */}
      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Total Records</p>
          <p className="stat-value">{records.length}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Last Added</p>
          <p className="stat-value stat-value--sm">{lastAdded ? lastAdded.name : '—'}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Stored Data</p>
          <p className="stat-value stat-value--sm">{storageSize} bytes</p>
        </div>
      </div>

      {/* Add / Edit form */}
      <RecordForm
        editTarget={editTarget}
        onAdd={addRecord}
        onUpdate={updateRecord}
        onCancel={() => setEditId(null)}
      />

      <div className="list-toolbar">
        <div className="filter-pills">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-pill ${filterCategory === cat ? 'filter-pill--active' : ''}`}
              onClick={() => setFilterCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        {records.length > 0 && (
          <button className="btn-clear" onClick={() => setShowClearConfirm(true)}>
            Clear all
          </button>
        )}
      </div>

      {/* Clear confirmation */}
      {showClearConfirm && (
        <div className="confirm-banner">
          <p>Delete all <strong>{records.length}</strong> records? This cannot be undone.</p>
          <div className="confirm-actions">
            <button className="btn-delete" onClick={clearAllRecords}>Yes, clear all</button>
            <button className="btn-cancel" onClick={() => setShowClearConfirm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Record table */}
      <RecordList
        records={filtered}
        onEdit={startEdit}
        onDelete={deleteRecord}
      />
    </div>
  )
}

export default App
