import React from 'react'
import RecordTable from './RecordTable';
import HeaderSup from "../topnav/Supplier/HeaderSup";
import Footer from "../bottomnav/IM/Footer";

function TableView() {
    return (
      <div>
        <HeaderSup />
        <main className="container my-4">
          <RecordTable />
        </main>
        <Footer />
      </div>
    );
  }
  

export default TableView
