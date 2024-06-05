import React from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

function Header() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSellButtonClick = () => {
    console.log(user);
    if (user) {
      navigate('/create'); 
    } else {
      navigate('/login'); 
    }
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" placeholder="Search city, area or locality" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span>ENGLISH</span>
          <Arrow />
        </div>
        <div className="loginPage">
          {user ? (
            <div className="language">
              <span> Welcome {user.displayName}</span>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
              <hr />
            </div>
          ) : (
            <span onClick={() => navigate('/login')} className="login-button">
              Login
            </span>
          )}
        </div>
        <div className="sellMenu" onClick={handleSellButtonClick} >
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus  />
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
