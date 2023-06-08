import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white text-center p-4">
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} Sushi Website. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
