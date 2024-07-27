"use client";
import Checkout from "@/components/checkout";
import useTheme from "@/hooks/use-theme";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const CheckoutComponent = () => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);
  const { design, store } = useTheme();

  useEffect(() => {
    if (!user?.verify && store?.auth_type !== "EasyOrder") {
      router.push("/login"); // Navigate to login page if conditions are not met
    }
  }, [user, store, router]);

  if (user?.verify || store?.auth_type === "EasyOrder") {
    return <Checkout theme={design?.checkout_page} />;
  }
};

export default CheckoutComponent;
