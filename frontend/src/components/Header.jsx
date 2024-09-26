import mastermetLogo from "../../public/mastermet-logo.png";
import { useNavigate } from 'react-router-dom';


function Header({ token }) {

      const navigate = useNavigate(); 

  const handleLogout = () => {
    sessionStorage.removeItem('token'); 
    navigate("/");
    window.location.reload(); 
  };

    return(
        <header className="p-3 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-around justify-content-lg-between">
            <div>
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <img src={mastermetLogo} alt="Mastermet Logo"  className="me-2" />
            </a>
            </div>
        
            {/* <div className="text-end">
            {(token) ? (
          <button type="button" className="btn btn-warning" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button type="button" className="btn btn-warning me-2">
            <a href="/register">Sign up</a>
          </button>
        )}           
            </div> */}
          </div>
        </div>
      </header>
    )
}

export default Header;