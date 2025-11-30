import React from 'react'
import { useState } from 'react'
import "../styles/SortNotes.css"

const SortNotes = ({ notes, setNotes }) => {
    const [sortAsc, setSortAsc] = useState(true);

    const handleSortByDate = () => {
        const sorted = [...notes].sort((a, b) => {
            const dateA = new Date(a.Data);
            const dateB = new Date(b.Data);
            return sortAsc ? dateA - dateB : dateB - dateA;
        });
        console.log("Po sortowaniu:", sorted.map(n => n.Data));
        setNotes(sorted);
        setSortAsc(!sortAsc);
    };

  return (
      <button onClick={handleSortByDate} className='buttonSorted'>
        Sortuj wg daty {sortAsc ? "↑" : "↓"}
      </button>
  );
}

export default SortNotes
