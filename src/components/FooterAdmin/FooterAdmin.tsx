const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white py-4 px-6 flex items-center border-[2px] border-white justify-between rounded-lg">
      <div className="font-bold">Ruranjo | Proyecto educativo</div>
      <div className="text-sm">© {new Date().getFullYear()} All rights reserved.</div>
    </footer>
  );
};

export default Footer;
