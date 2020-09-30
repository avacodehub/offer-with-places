import React from "react";
import "./notification.css";

const Notification = (props) => {
  if (props.notify) {
    setTimeout(()=> {
      props.setNotify(false)
    }, 5000)
  }
  return (
    <div>
      {props.notify ? (
        <div className="notification">Оффер создан!</div>
      ) : null}
    </div>
  );
};

export default React.memo(Notification);
