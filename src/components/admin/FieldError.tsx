import { useEffect, useState } from "react";

type FieldErrorProps = {
  message: string;
  visibleKey?: number;
};

const visibleMs = 3200;

export function FieldError({ message, visibleKey = 0 }: FieldErrorProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!message) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    const timer = window.setTimeout(() => setIsVisible(false), visibleMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [message, visibleKey]);

  if (!message || !isVisible) {
    return null;
  }

  return (
    <span className="field-error-tooltip" role="alert">
      {message}
    </span>
  );
}
