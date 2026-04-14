import { useState, useEffect, useRef } from 'react'

const CATEGORIES = ['Work', 'Personal', 'Finance', 'Health', 'Other']

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

function RecordForm({ editTarget, onAdd, onUpdate, onCancel }) {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [category, setCategory] = useState('Work')
  const [errors, setErrors] = useState({})
  const nameRef = useRef()

 
  useEffect(() => {
    if (editTarget) {
      setName(editTarget.name)
      setValue(editTarget.value)
      setCategory(editTarget.category)
      setErrors({})
      nameRef.current?.focus()
    } else {
      setName('')
      setValue('')
      setCategory('Work')
      setErrors({})
    }
  }, [editTarget])

  function validate() {
    const e = {}
    if (!name.trim()) e.name = 'Name is required'
    if (!value.trim()) e.value = 'Value is required'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }

    if (editTarget) {
      onUpdate({ ...editTarget, name: name.trim(), value: value.trim(), category })
    } else {
      onAdd({
        id: generateId(),
        name: name.trim(),
        value: value.trim(),
        category,
        createdAt: new Date().toISOString(),
      })
    }

    setName('')
    setValue('')
    setCategory('Work')
    setErrors({})
  }

  return (
    <div className={`record-form ${editTarget ? 'record-form--edit' : ''}`}>
      <h2 className="form-title">{editTarget ? ' Edit record' : 'Add new record'}</h2>

         <form onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="field-name">
            Name <span className="required">*</span>
          </label>
          <input
            id="field-name"
            ref={nameRef}
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter name"
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="field-value">
            Value <span className="required">*</span>
          </label>
          <input
            id="field-value"
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="e.g. 5000"
            aria-invalid={!!errors.value}
          />
          {errors.value && <p className="error-text">{errors.value}</p>}
        </div>
      </div>

      <div className="form-field" style={{ marginBottom: '1rem' }}>
        <label htmlFor="field-category">Category</label>
        <select
          id="field-category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {editTarget ? 'Update record' : 'Add record'}
        </button>
        {editTarget && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
    </div>
  )
}

export default RecordForm
