import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useSectionNavigation(): (id: string) => void {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useCallback(
    (id: string) => {
      if (pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/", { state: { scrollTo: id } });
      }
    },
    [navigate, pathname],
  );
}
