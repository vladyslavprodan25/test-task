import React from "react";

interface MessageProps {
  text: string;
  success: boolean;
}

const Message: React.FC<MessageProps> = ({ text, success }) => {
  return (
    <p
      style={{
        color: success ? "green" : "red",
        fontWeight: "bold",
        marginTop: "10px",
      }}
    >
      {text}
    </p>
  );
};

export default Message;
