import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Sidebar from './components/sidebar.tsx'
import MainContent from './components/MainContent.tsx'
import ProductPage from './components/productPage.tsx'
export default function App() {
  return (
    <Router>
      <div className='flex h-full overflow-hidden'>
        <Sidebar />
        <div className='min-h-0 min-w-0 flex-1 overflow-y-auto'>
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
