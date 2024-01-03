import React from 'react';
import { Link } from 'react-router-dom';

// Change the function names and links
// to fit your portfolio topic.

function Navigation() {
  return (
    <nav>
        {/* Add links to Home, Topics, Gallery, Contact, and Staff Pages  */}
        <Link to="/">Home</Link>
        <Link to="../TopicsPage">Topics</Link>
        <Link to="../CasesPage">Cases</Link>
    </nav>
  );
}

export default Navigation;
