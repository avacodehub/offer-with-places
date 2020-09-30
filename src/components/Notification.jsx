import React from "react";
import "./notification.css";

const Notification = (props) => {
  if (props.notify) {
    setTimeout(()=> {
      props.setNotify(false)
    }, 5000)
  }
  return (
    <>
      {props.notify ? (
        <div className="notification">Оффер создан!</div>
      ) : null}
    </>
  );
};

export default React.memo(Notification);
