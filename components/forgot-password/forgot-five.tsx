"use client";
import useTheme from "@/hooks/use-theme";
import { clearMessage } from "@/redux/features/message.slice";
import httpReq from "@/utils/http/axios/http.service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ForgotFive = () => {
  const [user, setUser] = useState({});
  const [page, setPage] = useState("find");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  return (
    <>
      <div className="container mx-auto py-20 lg:py-[320px]">
        <section className="flex justify-center">
          <div className="max-w-[560px] mx-auto text-center bg-white relative overflow-hidden  py-6 px-6 w-full md:px-[60px] drop-shadow-xl my-10">
            {page === "otp" ? (
              <Verifying setPage={setPage} setUser={setUser} user={user} />
            ) : page === "find" ? (
              <Finding setPage={setPage} setUser={setUser} />
            ) : (
              <Changeing setUser={setUser} setPage={setPage} user={user} />
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ForgotFive;

const Finding = ({ setPage, setUser }: any) => {
  const { design, store_id, store } = useTheme();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // console.log(errors);
  const onSubmit = (data: any) => {
    setLoading(false);
    if (data.phone) {
      httpReq
        .post("forget-pass", { phone: data.phone, store_id })
        .then((res) => {
          if (res.user_id) {
            setPage("otp");
            setUser(res);
            setLoading(false);
          } else {
            toast(res?.error, { type: "error" });
            setLoading(false);
          }
        })
        .catch((er) => {
          setLoading(false);
          if (er.response.data.error) {
            toast(er.response.data.error, { type: "warning" });
            setPage("find");
            setUser({});
            setLoading(false);
          }
        });
    } else {
      setLoading(false);
    }
  };
  return (
    <form
      className="flex flex-col space-y-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h4 className="text-3xl font-semibold my-3 text-black text-center">
        Find Your Account
      </h4>
      {store?.auth_type === "phone" || store?.auth_type === "EasyOrder" ? (
        <input
          {...register("phone", { required: true })}
          type="number"
          placeholder="Phone number"
          className="mt-1 p-2 border focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300"
        />
      ) : (
        <input
          {...register("phone", { required: true })}
          type="email"
          placeholder="Your Email"
          className="mt-1 p-2 border focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300"
        />
      )}
      {errors.phone?.type === "required" && (
        <p className="text-red-300 font-sans font-semibold mt-0">
          The field is required!
        </p>
      )}

      {loading ? (
        <p
          className="text-left py-3 px-8 w-28 rounded-md text-gray-400"
          style={{
            backgroundColor: design.header_color,
            color: design.text_color,
          }}
        >
          Loading
        </p>
      ) : (
        <input
          type="submit"
          value="Find"
          className=" font-semibold bg-gray-700 uppercase py-2 px-6 text-white hover:bg-amber-600 transition-all duration-300 ease-linear"
        />
      )}
    </form>
  );
};
const Verifying = ({ setPage, setUser, user }: any) => {
  const { design } = useTheme();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    if (data.otp) {
      setLoading(true);
      data["user_id"] = user?.user_id;
      httpReq
        .post("forget-verify", data)
        .then(({ error, verify, success, user_id }) => {
          if (success) {
            toast(success, { type: "success" });
          }
          if (error) {
            toast(error, { type: "warning" });
          }
          if (verify) {
            setPage("cng");
            setUser({ user_id });
          }
          setLoading(false);
        })
        .catch((er) => {
          setLoading(false);
        });
    }
  };
  return (
    <form
      className="border border-gray-300 rounded-2xl p-6 md:m-14 flex flex-col space-y-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h4 className="text-3xl font-semibold my-3 text-black text-center">
        Verify Your Account
      </h4>
      <input
        {...register("otp", { required: true })}
        type="tel"
        placeholder="Your OTP"
        className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300"
      />
      {errors.otp?.type === "required" && (
        <p className="text-red-300 font-sans font-semibold mt-0">
          The field is required!
        </p>
      )}

      <div className="flex justify-center">
        {loading ? (
          <p
            className="text-left py-3 px-8 w-28 rounded-md text-gray-400"
            style={{
              backgroundColor: design.header_color,
              color: design.text_color,
            }}
          >
            Loading
          </p>
        ) : (
          <input
            type="submit"
            value="Verify"
            className=" font-semibold bg-gray-700 uppercase py-2 px-6 text-white hover:bg-amber-600 transition-all duration-300 ease-linear"
          />
        )}
      </div>
    </form>
  );
};
const Changeing = ({ setPage, setUser, user }: any) => {
  const { design } = useTheme();

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    setLoading(true);
    if (data.password === data.confirm_password) {
      httpReq
        .post("change-password", { user_id: user?.user_id, ...data })
        .then(({ success, error }) => {
          if (success) {
            toast(success, { type: "success" });

            router.push("/login");
            setLoading(false);

            setPage("find");
            setUser({});
          }
          if (error) {
            toast(error, { type: "warning" });
            setLoading(false);
          }
        })
        .catch((er) => {
          setLoading(false);
        });
    } else {
      toast("your password dosen't match", {
        type: "warning",
        position: "top-center",
        delay: 1,
      });
      setLoading(false);
    }
  };
  return (
    <form
      className="border border-gray-300 rounded-2xl p-6 md:m-14 flex flex-col space-y-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h4 className="text-3xl font-semibold my-3 text-black text-center">
        Change Your Password
      </h4>
      <input
        {...register("password", { required: true, minLength: 4 })}
        type="password"
        placeholder="Passoword"
        className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300"
      />
      {errors.password?.type === "required" && (
        <p className="text-red-300 font-sans font-semibold mt-0">
          The field is required!
        </p>
      )}
      {errors.password?.type === "minLength" && (
        <p className="text-red-300 font-sans font-semibold mt-0">
          {" "}
          You Must Give 8 character
        </p>
      )}

      <input
        type={"password"}
        {...register("confirm_password", { required: true, minLength: 4 })}
        placeholder="Confirm Password"
        className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300"
      />

      {errors.confirm_password?.type === "required" && (
        <p className="text-red-300 font-sans font-semibold mt-0">
          The field is required!
        </p>
      )}
      {errors.confirm_password?.type === "minLength" && (
        <p className="text-red-300 font-sans font-semibold mt-0">
          {" "}
          You Must Give 8 character
        </p>
      )}

      <div className="flex justify-center">
        {loading ? (
          <p
            className="text-left py-3 px-8 w-28 rounded-md text-gray-400"
            style={{
              backgroundColor: design.header_color,
              color: design.text_color,
            }}
          >
            Loading
          </p>
        ) : (
          <input
            type="submit"
            value="Submit"
            className=" font-semibold bg-gray-700 uppercase py-2 px-6 text-white hover:bg-amber-600 transition-all duration-300 ease-linear"
          />
        )}
      </div>
    </form>
  );
};
