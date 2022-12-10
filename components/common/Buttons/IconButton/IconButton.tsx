import Image from "next/image";
import Button from "../BasicButton/Button";

interface IconButtonProps {
  iconSrc?: string;
  text: string;
  subText: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isActive?: boolean;
}

export const IconButton = ({
  iconSrc,
  text,
  subText,
  onClick,
  isActive,
}: IconButtonProps) => (
  <Button
    style={
      isActive
        ? {
            display: "flex",
            borderRadius: "15px",
            border: "1px solid #6358dc",
            backgroundColor: "#d5d9ff",
          }
        : {
            display: "flex",
            borderRadius: "15px",
            border: "1px solid #ededed",
            backgroundColor: "#fff",
          }
    }
    onClick={onClick}
  >
    <div style={{ flex: 1, padding: "5%" }}></div>
    <div style={{ flex: 2, margin: "auto 0" }}>
      <h4 style={{ textAlign: "left", margin: 0, color: "#000" }}>{text}</h4>
      <p
        style={{
          fontSize: "0.5rem",
          textAlign: "left",
          color: "#b6b6b6",
          margin: 0,
        }}
      >
        {subText}
      </p>
    </div>
  </Button>
);
