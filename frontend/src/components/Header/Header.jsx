import { useContext, useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo4.png";
import { Link, NavLink } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false); // State to toggle menu visibility
  const { user, role, token } = useContext(authContext);
  const handleStickyHeader = () => {
    if (!headerRef.current) return;

    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current.classList.add("sticky_header");
    } else {
      headerRef.current.classList.remove("sticky_header");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyHeader);
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // Toggle menu visibility
  };

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <Link to="/home">
              <img src={logo} alt="App Logo" className="w-fit h-full " />
            </Link>
          </div>

          {/* Desktop menu (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-[2.7rem]">
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu (toggle via BiMenu) */}
          {menuVisible && (
            <div
              className="navigation md:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={toggleMenu}
            >
              <ul className="menu bg-white w-64 h-full flex flex-col items-center gap-4 py-10 absolute right-0 top-0">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      onClick={toggleMenu} // Close menu on click
                      className={({ isActive }) =>
                        isActive
                          ? "text-primaryColor text-[16px] leading-7 font-[600]"
                          : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                      }
                    >
                      {link.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Nav right */}

          <div className="flex items-center gap-4">
            {token && user ? (
              <Link
                to={`${
                  role === "doctor" ? "/doctors/profile/me" : "users/profile/me"
                }`}
              >
                <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                  <img
                    src={user?.photo}
                    alt="User Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </figure>
              </Link>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}

            {/* BiMenu for mobile */}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
