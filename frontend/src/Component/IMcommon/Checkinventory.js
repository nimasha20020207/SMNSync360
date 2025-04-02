import Header from '../topnav/IM/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from '../bottomnav/IM/Footer';
import { useNavigate } from 'react-router-dom';

function Item() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Header />
      <div className="container my-5">
        {/* Flex container to align cards horizontally */}
        <div className="d-flex justify-content-center flex-wrap gap-4">
          {/* Card for Add New Material */}
          <div
            onClick={() => navigate('/MaterialView')}
            className="card cursor-pointer"
            style={{
              width: '250px',
              height: '300px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#007bff',
              color: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: '20px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
            }}
          >
            <i className="fas fa-box-open fa-3x mb-3"></i> {/* Add Material Icon */}
            <div>Material stock</div>
          </div>

          {/* Card for Add New Equipment */}
          <div
            onClick={() => navigate('/EquipmentView')}
            className="card cursor-pointer"
            style={{
              width: '250px',
              height: '300px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FF5733',
              color: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: '20px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
            }}
          >
            <i className="fas fa-cogs fa-3x mb-3"></i> {/* Add Equipment Icon */}
            <div>Equipment stock</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Item;
