import React from 'react'
import Nav from '../topnav/nav'
import Fot from '../bottomnav/foter'

function displayproject() {
  return (
    <div>
        <Nav/>
        <div style={{ padding: '20px', display: 'flex', gap: '10px' }}>
            <button 
                style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#007bff', 
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                New Project
            </button>
            <input 
                type="text" 
                placeholder="Search projects..."
                style={{ 
                    padding: '8px',
                    width: '200px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                }}
            />
        </div>
        <Fot/>
    </div>
  )
}

export default displayproject