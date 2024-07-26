"use client";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store, { persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "@/hooks/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CartPopUp from "@/components/cart-popup";
const queryClient = new QueryClient();

const AppWrapper = ({ children, design, headerSetting }: any) => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Header design={design} headerSetting={headerSetting} />
            {children}
            <Footer />
            <CartPopUp />
            <ToastContainer position="top-right" newestOnTop />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default AppWrapper;
