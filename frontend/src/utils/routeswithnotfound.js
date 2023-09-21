import React from 'react'
import { Route, Routes } from 'react-router'

function RoutesWithNotFound({children}) {
  return (
    <Routes>
      {children}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  )
}

export default RoutesWithNotFound