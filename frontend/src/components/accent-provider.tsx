import { createContext, useContext, useEffect, useState } from "react";

type AccentColor = "purple" | "blue" | "green" | "orange" | "red";

type AccentProviderProps = {
  children: React.ReactNode;
  defaultAccent?: AccentColor;
  storageKey?: string;
};

type AccentProviderState = {
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
};

const initialState: AccentProviderState = {
  accent: "purple",
  setAccent: () => null,
};

const AccentProviderContext = createContext<AccentProviderState>(initialState);

export function AccentProvider({
  children,
  defaultAccent = "purple",
  storageKey = "patchy-ui-accent",
  ...props
}: AccentProviderProps) {
  const [accent, setAccent] = useState<AccentColor>(
    () => (localStorage.getItem(storageKey) as AccentColor) || defaultAccent
  );

  useEffect(() => {
    const root = window.document.documentElement;
    // Remove all accent classes
    root.classList.remove("accent-purple", "accent-blue", "accent-green", "accent-orange", "accent-red");
    // Add the new accent class
    root.classList.add(`accent-${accent}`);
  }, [accent]);

  const value = {
    accent,
    setAccent: (accent: AccentColor) => {
      localStorage.setItem(storageKey, accent);
      setAccent(accent);
    },
  };

  return (
    <AccentProviderContext.Provider {...props} value={value}>
      {children}
    </AccentProviderContext.Provider>
  );
}

export const useAccent = () => {
  const context = useContext(AccentProviderContext);

  if (context === undefined)
    throw new Error("useAccent must be used within an AccentProvider");

  return context;
};