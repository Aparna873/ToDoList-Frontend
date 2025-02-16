
const Header = () => {
  return (
    <nav
      className="fixed top-0 z-50 w-full border-b"
      style={{ 
        backgroundColor: "#2A3674",
        borderColor: "#7886C7"
      }}
    >
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <span
              className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-[#FFF5F5]"
            >
             Taskito Planner
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;