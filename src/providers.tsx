import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import i18next from "i18next";

export function useLanguageSync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleLanguageChange = () => {
      queryClient.invalidateQueries(); // 🔥 refetch everything
    };

    i18next.on("languageChanged", handleLanguageChange);

    return () => {
      i18next.off("languageChanged", handleLanguageChange);
    };
  }, [queryClient]);
}
