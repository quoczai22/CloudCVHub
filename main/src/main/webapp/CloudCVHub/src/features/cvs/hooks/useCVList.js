import { useState } from 'react'

export function useCVList(initialCvs = []) {
  const [cvs, setCvs] = useState(initialCvs)
  const [search, setSearch] = useState("")

  const filteredCvs = cvs.filter(cv => 
    cv.title.toLowerCase().includes(search.toLowerCase()) ||
    cv.type.toLowerCase().includes(search.toLowerCase())
  )

  const deleteCV = (title) => {
    setCvs(prev => prev.filter(c => c.title !== title))
  }

  return { cvs: filteredCvs, search, setSearch, deleteCV }
}
