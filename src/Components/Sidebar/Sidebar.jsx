import React from "react";
import {
  MdTask,
  MdCalendarMonth,
  MdAccountCircle,
  MdFileOpen,
} from "react-icons/md";

const Sidebar = ({ setActiveComponent, activeComponent }) => {
  const sidebarItems = [
    {
      id: 1,
      label: "Tasks",
      icon: <MdTask className="w-5 h-5" />,
      key: "Tasks",
    },
    {
      id: 2,
      label: "Calendar",
      icon: <MdCalendarMonth className="w-5 h-5" />,
      key: "Calendar",
    },
    {
      id: 3,
      label: "Template",
      icon: <MdFileOpen className="w-5 h-5" />,
      key: "Template",
    },
    {
      id: 4,
      label: "Profile",
      icon: <MdAccountCircle className="w-5 h-5" />,
      key: "Profile",
    },
  ];
  return (
    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-16"
      style={{
        backgroundColor: "#7886C7",
        borderRight: "1px solid rgba(42, 54, 116, 0.3)",
      }}
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveComponent(item.key)}
                className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                                ${
                                  activeComponent === item.key
                                    ? "bg-[#2A3674] text-[#FFF5F5]"
                                    : "text-[#B5C4E3] hover:bg-[#2A3674] hover:bg-opacity-20"
                                }`}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
