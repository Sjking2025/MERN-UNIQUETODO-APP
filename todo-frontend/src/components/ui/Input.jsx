import React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, type, icon: Icon, ...props }, ref) => {
  const baseStyles = {
    display: "flex",
    height: "48px",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    fontSize: "14px",
    color: "white",
    paddingLeft: Icon ? "44px" : "16px",
    paddingRight: "16px",
    outline: "none",
    transition: "all 0.2s ease",
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {Icon && (
        <div 
          style={{
            position: "absolute",
            left: "14px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "rgba(255, 255, 255, 0.5)",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={18} />
        </div>
      )}
      <input
        type={type}
        style={baseStyles}
        className={cn(
          "placeholder:text-white/40",
          "focus:ring-2 focus:ring-purple-500 focus:border-transparent",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});

Input.displayName = "Input";

export { Input };
