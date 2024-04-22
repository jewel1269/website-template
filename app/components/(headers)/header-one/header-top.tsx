"use client";
import React, { useState } from "react";

import { mobile, location, userIcon, logoutIcon } from "@/assets/svg";
import Link from "next/link";

// import { primaryColor } from '../../../constant';

const HeaderTop = ({ headerSetting, design }: any) => {
  // const { isLoggedIn } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  // const logOut = () => {
  //   dispatch(logout());
  // };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { phone, address } = headerSetting;

  return (
    <div
      className=" w-full py-2 text-sm hidden md:block"
      style={{
        backgroundColor: design?.header_color,
        color: design?.text_color,
      }}
    >
      <div className="sm:container px-5 mx-auto flex justify-between items-center">
        <div className="flex items-center divide-x">
          <HeaderTopMenu icon={mobile} doc={phone} />
          <HeaderTopMenu icon={location} doc={address} />
        </div>

        <div className="flex items-center gap-x-4">
          {isLoggedIn ? (
            <div
              className="lg:cursor-pointer"
              // onClick={() => logOut()}
            >
              <HeaderTopMenu icon={logoutIcon} doc={"Logout"} />
            </div>
          ) : (
            <Link href="/login">
              {" "}
              <HeaderTopMenu icon={userIcon} doc={"Log In/Sign Up"} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;

export const HeaderTopMenu = (props: any) => {
  return (
    <div className="flex items-center gap-1 px-4">
      {props.icon}
      <p>{props.doc}</p>
    </div>
  );
};
