import React from "react";
//esto:
/*const Header = (props) => {
  const { titulo } = props;*/

//es lo mismo que esto:

const Header = ({ titulo }) => {
  return (
    <nav>
      <div className="nav-wrapper light-blue darken-2">
        <a href="#!" className="brand-logo">
          {titulo}
        </a>
      </div>
    </nav>
  );
};

export default Header;
