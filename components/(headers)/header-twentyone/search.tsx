"use client";
import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { getPrice } from "@/utils/get-price";
import { productImg } from "@/site-settings/siteUrl";
import Link from "next/link";
import Taka from "@/utils/taka";

const Search = ({ search, setSearch }: any) => {
  const { store_id } = useTheme();
  const [result, setResult] = useState([]);

  // const result = product.filter(item => item?.name.toLowerCase().includes(search?.toLowerCase()))

  useEffect(() => {
    async function handleSearch() {
      try {
        const response = await httpReq.post(
          `product/search?store_id=${store_id}&search=${search}`
        );
        if (!response?.error) {
          setResult(response);
        } // the API response object
      } catch (error) {
        console.error(error);
      }
    }

    handleSearch();
  }, [search, store_id]);

  return (
    <motion.div
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ ease: "easeOut", duration: 1 }}
      className="shadow-xl rounded-md bg-white w-full top-2 z-50 left-0 right-0"
    >
      <h3 className="text-lg font-semibold mx-6 py-1">
        {result?.length} results for{" "}
        <span className="font-bold text-red-400">{search}</span>
      </h3>
      <div className=" grid grid-cols-2 gap-2 my-4 justify-center w-full overflow-y-auto max-h-[500px]">
        {result?.map((res, idx) => (
          <Single item={res} key={idx} setSearch={setSearch} />
        ))}
      </div>
    </motion.div>
  );
};

export default Search;

const Single = ({ item, setSearch }: any) => {
  const price = getPrice(
    item?.regular_price,
    item?.discount_price,
    item?.discount_type
  );

  return (
    <motion.div
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ ease: "easeOut", duration: 1 }}
      className="flex flex-col border-b-2 items-center bg-white md:flex-row z-40 px-4 border-gray-100 last:border-b-0"
    >
      <img
        className="object-cover h-24 rounded-t-lg w-24 "
        src={productImg + item?.image}
        alt=""
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <Link
          href={"/product/" + item?.id + "/" + item?.slug}
          onClick={() => setSearch("")}
          className="mb-2 text-sm font-semibold tracking-tight text-gray-900 dark:text-white capitalize"
        >
          {item.name.slice(0, 100)}
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <Taka tk={price} />
        </p>
      </div>
    </motion.div>
  );
};
