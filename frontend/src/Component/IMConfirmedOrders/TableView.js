import React from 'react';
import RecordTable from './RecordTable';
import HeaderSup from "../topnav/Supplier/HeaderSup";
import Footer from "../bottomnav/IM/Footer";
import background from '../pictures/stock.jpg'

function TableView() {
  // Inline CSS for background image with opacity
  const tableViewStyle = {
    position: 'relative',
    minHeight: '100vh', // Adjust height as needed
    backgroundImage: `url(${background})`, // Replace with your image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const overlayStyle = {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adds opacity over the image
    zIndex: -1, // Ensure background stays behind content
  };

  return (
    <div style={tableViewStyle}>
      <div style={overlayStyle}></div> {/* Overlay for opacity */}
      <HeaderSup />
      <main className="container my-4">
        <RecordTable />
      </main>
      <Footer />
    </div>
  );
}

export default TableView;
