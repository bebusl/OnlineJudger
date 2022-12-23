import Image from "next/image";
import Button from "../BasicButton/Button";

interface IconButtonProps {
  iconSrc: string;
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
    width="100%"
    style={
      isActive
        ? {
            display: "flex",
            border: "1px solid #6358dc",
            backgroundColor: "#d5d9ff",
          }
        : {
            display: "flex",
            border: "1px solid #ededed",
            backgroundColor: "#fff",
          }
    }
    onClick={onClick}
  >
    <div style={{ flex: 1 }}>
      {iconSrc && <Image src={iconSrc} width="40px" height="40px" alt="icon" />}
    </div>
    <div style={{ flex: 2, margin: "auto 0" }}>
      <h4 style={{ textAlign: "left", margin: 0, color: "#000" }}>{text}</h4>
      <p
        style={{
          fontSize: "0.7rem",
          textAlign: "left",
          color: "#6e6e6e",
          margin: 0,
        }}
      >
        {subText}
      </p>
    </div>
  </Button>
);
