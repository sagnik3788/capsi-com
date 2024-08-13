import { useCallback, useMemo, useState, useEffect } from "react";
import Routes from "../../routes";
import useAppStore from "../store";
import { deleteCookie, getCookie, setCookie } from "../utils/cookieUtil";
import { getExpoTokensUsingGoogleOneTap, revalidateToken } from "@/apis/login";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const router = useRouter();

  const userData = useAppStore(({ userData }) => userData);
  const setUserData = useAppStore(({ setUserData }) => setUserData);
  const [oneTapData, setOneTapData] = useState(null);

  useEffect(() => {
    if (oneTapData) {
      const { id, name, email, picture } = oneTapData;
      const role = document.getElementById("userrole")?.value;
      const context = document.getElementById("usercontext")?.value;
      getExpoTokensUsingGoogleOneTap(oneTapData, role, context)
        .then(({ result }) => {
          storeBasicInfo({ ...result, id, name, email, picture });
        });
    }
  }, [oneTapData]);

  // private methods
  const storeBasicInfo = (data) => {
    const {
      id,
      name,
      email,
      picture,
      contact,
      accessToken,
      given_name,
      family_name,
      about,
      roles,
      appProducerHandle,
    } = data;
    setCookie("accessToken", accessToken.id, 90);
    // setCookie('refreshToken', refreshToken.id, 30);
    return setUserData({
      id,
      name,
      email,
      picture,
      contact,
      given_name,
      family_name,
      about,
      roles,
      appProducerHandle,
    });
  };

  // Shared methods/properties
  const authenticate = async () => {
    const c = getCookie("accessToken");
    if (c) {
      // user has cookie
      if (userData.data && userData.data.name) {
        return true;
      } else {
        // user has cookie but no data. Call /revalidateToken
        return revalidateToken(c)
          .then((res) => {
            storeBasicInfo(res.userRecord);
            return true;
          })
          .catch((e) => {
            return false;
          });
      }
    } else {
      return false;
      // user does not have any cookie. Prompt login
    }
  };

  // Used by google login to get expo tokens
  const storeUserData = async (data) => {
    console.log({ parsedData: data });
    setOneTapData(data);
  };

  const showLoginModal = useAppStore(({ showLoginModal }) => showLoginModal);
  const hideLoginModal = useAppStore(({ hideLoginModal }) => hideLoginModal);

  const isLoggedIn = useMemo(
    () => !!userData.isLoggedIn,
    [userData.isLoggedIn]
  );

  const logout = useCallback(() => {
    deleteCookie("accessToken");
    setUserData(null); // also sets isLogged to false
    // window.google?.accounts.id.disableAutoSelect();
    router.push(Routes.homePage.path);
  }, [router, setUserData]);

  const userDetails = useMemo(() => {
    return userData.data ? userData.data : {};
  }, [userData.data]);

  // const cancelGLogin = () => window.google?.accounts.id.cancel();

  return {
    isLoggedIn,
    logout,
    userDetails: userDetails,
    // cancelGLogin,
    showLoginModal,
    hideLoginModal,
    authenticate,
    storeUserData,
  };
}