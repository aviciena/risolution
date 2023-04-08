import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "universal-cookie";

export function useRedirectLogin() {
  const router = useRouter();
  const pageWithoutAuthorize = [
    "/account/login",
    "/account/register",
  ];
  const isPageWithoutAuthorize = pageWithoutAuthorize.includes(router.pathname);

  useEffect(() => {
    if (isPageWithoutAuthorize) return;
    const cookies = new Cookies();
    if (!cookies.get("authorized")) {
      router.replace("/account/login");
    }
  }, []);
}