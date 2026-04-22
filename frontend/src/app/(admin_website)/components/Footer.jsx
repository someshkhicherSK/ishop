// components/Footer.jsx
const Footer = () => {
  return (
    <footer className="p-4 text-center bg-white shadow sticky bottom-0 left-0 ">
      <p className="text-gray-500 text-sm">
        © {new Date().getFullYear()} Admin Dashboard. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
