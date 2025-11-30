import React from 'react'
import { useState } from 'react'
import "../styles/SortNotes.css"

const SortNotes = ({ notes, setNotes }) => {
  const [sortAsc, setSortAsc] = useState(false); // domyślnie najnowsze na górze

  const handleSortByDate = () => {
    const sorted = [...notes].sort((a, b) => {
      const dateA = new Date(a.Data);
      const dateB = new Date(b.Data);
      return sortAsc ? dateA - dateB : dateB - dateA;
    });
    setNotes(sorted);
    setSortAsc(!sortAsc); // zmiana kierunku sortowania
  };

  return (
    <button onClick={handleSortByDate} className='buttonSorted'>
      Sortuj wg daty {sortAsc ? "↑" : "↓"}
    </button>
  );
};

export default SortNotes;
