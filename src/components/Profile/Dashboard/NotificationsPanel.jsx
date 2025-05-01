import React, { useEffect, useState } from "react";
import axios from "axios";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:3000/notifications");
      // console.log("response notification: ", res);
      setNotifications(res.data);
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircleIcon style={{ color: "#22c55e" }} />; // green
      case "error":
        return <ErrorOutlineIcon style={{ color: "#ef4444" }} />; // red
      case "warning":
        return <WarningAmberIcon style={{ color: "#eab308" }} />; // yellow
      default:
        return <InfoIcon style={{ color: "#3b82f6" }} />; // blue
    }
  };

  return (
    <>
      <div className="notifications">
        <h2 className="">
          <NotificationsNoneIcon style={{ fontSize: 20 }} />
          Notifications
        </h2>
        <div className="space-y-4 max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-gray-400 text-center">No Notifications</p>
          ) : (
            notifications.map((note) => (
              <div key={note._id} className="flex items-start space-x-3">
                {/* <div className="mt-1"></div> */}
                <div>
                  <p className="font-medium">
                    {getIcon(note.type)} {note.title}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 text-xs">{note.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationsPanel;
