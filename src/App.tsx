import React, { ChangeEvent, FormEvent, useState } from 'react'

import './table.css' // For custom table styling
import Table from './components/Table'
import { ItemData } from './types/response_data.type'
import { transformData } from './utils/tranform_data'

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [flaskResponse, setFlaskResponse] = useState<ItemData[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0] || null
    setFile(uploadedFile)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      fetch(
        'https://irt-backend-api-eca8741fa578.herokuapp.com/api/irt/upload',
        {
          method: 'POST',
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setFlaskResponse(data.data)
          setMessage(data.message)
        })
        .catch((error) => console.error('Error:', error))
    } else {
      alert('Please upload an Excel file.')
    }
  }
  return (
    <div>
      <h1>Item Analysis</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".xls,.xlsx" onChange={handleFileUpload} />
        <button type="submit">Submit</button>
      </form>

      {/* Display the message */}
      {message && <h2>Message: {message}</h2>}
      {flaskResponse &&
        flaskResponse.map((item: ItemData, index: number) => {
          return (
            <div key={index}>
              <h4>Question {item.question}</h4>
              <Table data={transformData(item)} />
            </div>
          )
        })}
    </div>
  )
}

export default App
