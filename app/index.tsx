import {
  useEffect,
} from "react";

import {
  router,
} from "expo-router";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  auth,
} from "../firebase/config";

export default function Index() {

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(

      auth,

      (user) => {

        if (user) {

          router.replace(
            "/(drawer)/home"
          );

        } else {

          router.replace(
            "/login"
          );
        }
      }
    );

    return unsubscribe;

  }, []);

  return null;
}