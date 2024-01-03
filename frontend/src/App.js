// Import dependencies
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Components, styles, media
import Navigation from './components/Navigation';
import './App.css';

// Import pages you have completed:
// Home, Topics, Gallery, Contact, and Staff Pages 
import HomePage from './pages/HomePage';
import TopicsPage from './pages/TopicsPage';

import MattersPage from './pages/CasesPage';

// For Create and Edit, use the form OR table design; not both.
// If your schema requires LONG data input, then use the FORM design:


// If your schema requires SHORT data input, then use the TABLE design.
import EditMatterPageTable from './pages/EditCasePageTable';
import AddMatterPageTable from './pages/AddCasePageTable';

// Define the function that renders the content in Routes, using State.
function App() {

  const [matter, setMatterToEdit] = useState([])

  return (
    <>
      <BrowserRouter>

          <header>
            <h1>
              <img src="android-chrome-192x192.png" alt="Robert Sonnenfelt"/>
              Robert Sonnenfelt
            </h1>
            <p>This website is the final portfolio project for CS 290.</p>
          </header>

          <Navigation />

          <main>
            <section>
                <Routes> 
                    {/* Add Routes for Home, Topics, Gallery, Contact, and Staff Pages.  */}
                    
                    <Route path="/" element={<HomePage />} />
                    <Route path="/TopicsPage" element={<TopicsPage />} />
                    <Route path="/CasesPage" element={<MattersPage setMatter={setMatterToEdit}/>} />

                 
                    {/* Use these if your schema requires LONG data input: */}
                    <Route path="/AddCasePageTable" element={<AddMatterPageTable />} /> 
                    <Route path="/EditCasePageTable" element={<EditMatterPageTable matterToEdit={matter} />} />

                    {/* Or these if your schema requires SHORT data input: */}
                     
                </Routes>
              </section>
          </main>

          <footer>
          <p>&copy; 2023 Robert Sonnenfelt</p>
          </footer>

      </BrowserRouter>
    </>
  );
}

export default App;