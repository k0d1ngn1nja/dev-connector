import React from 'react';

const Footer = (props) => {
  return (
  	<footer className="bg-dark text-white mt-5 p-4 text-center">
			<p>Copyright &copy; {new Date().getFullYear()} DevConnector</p>
  	</footer>
  );
};

export default Footer;
