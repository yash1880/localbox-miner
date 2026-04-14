
const CATEGORY_STYLES = {
  Work:     { bg: '#eff6ff', color: '#1d4ed8' },
  Personal: { bg: '#f0fdf4', color: '#15803d' },
  Finance:  { bg: '#fffbeb', color: '#b45309' },
  Health:   { bg: '#f0fdfa', color: '#0f766e' },
  Other:    { bg: '#f5f3ff', color: '#6d28d9' },
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function RecordRow({ record, onEdit, onDelete }) {
  const catStyle = CATEGORY_STYLES[record.category] || CATEGORY_STYLES.Other

  return (
    <tr>
      <td className="cell-name">{record.name}</td>
      <td>{record.value}</td>
      <td>
        <span
          className="category-badge"
          style={{ background: catStyle.bg, color: catStyle.color }}
        >
          {record.category}
        </span>
      </td>
      <td className="cell-date">{formatDate(record.createdAt)}</td>
      <td>
        <div className="row-actions">
          <button className="btn-edit" onClick={() => onEdit(record.id)}>
            Edit
          </button>
          <button className="btn-delete" onClick={() => onDelete(record.id)}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

export default RecordRow
