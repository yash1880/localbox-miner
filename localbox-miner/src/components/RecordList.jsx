import RecordRow from './RecordRow'

function RecordList({ records, onEdit, onDelete }) {
  if (records.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-title">No records found</p>
        <p className="empty-sub">Add your first record using the form above.</p>
      </div>
    )
  }

  return (
    <div className="record-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Category</th>
            <th>Added</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <RecordRow
              key={record.id}
              record={record}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecordList
