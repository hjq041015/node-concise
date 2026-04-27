import { useMutation } from "@tanstack/react-query";
import { useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router";

import { getOriginURL as getOriginURLApi } from "../services/apiURL";

export function useRedirect() {
  const { urlCode = "" } = useParams();
  const navigate = useNavigate();

  const {
    mutate: getOriginURL,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ["getOriginURL"],
    mutationFn: () => getOriginURLApi(urlCode),
    onSuccess: (data) => {
      if (data.data) {
        window.location.href = data.data as string;
      }
    },
    onError: () => {
      navigate("/");
    },
  });

  const handleRedirect = useCallback(() => {
    if (urlCode) {
      getOriginURL();
    }
  }, [urlCode, getOriginURL]);

  useEffect(() => {
    handleRedirect();
  }, [handleRedirect]);

  return {
    isPending,
    isError,
    error,
  };
}
