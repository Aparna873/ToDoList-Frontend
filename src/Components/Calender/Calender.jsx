import { useContext } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TaskContext from "../../GlobalVariables/TaskContext";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const Calender = () => {
  const { tasks } = useContext(TaskContext);

  const customStyles = {
    ".rbc-today": {
      backgroundColor: "#4169E1 !important",
      opacity: 0.1,
    },
    ".rbc-active": {
      backgroundColor: "#000080 !important",
      color: "white !important",
    },
    ".rbc-event": {
      backgroundColor: "#000080 !important",
    },
    ".rbc-selected": {
      backgroundColor: "#FFD700 !important",
    },
    ".rbc-header": {
      backgroundColor: "#4169E1",
      color: "white",
    },
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-2 text-[#000080]">
        Task Calendar
      </h2>
      <style>
        {Object.entries(customStyles)
          .map(
            ([selector, styles]) =>
              `${selector} ${JSON.stringify(styles)
                .replace(/[{}"]/g, "")
                .replace(/,/g, ";")}`
          )
          .join("\n")}
      </style>
      <Calendar
        localizer={localizer}
        events={tasks}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="task"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default Calender;
