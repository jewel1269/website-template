"use client";
import useTheme from "@/hooks/use-theme";
import { productImg } from "@/site-settings/siteUrl";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import Taka from "@/utils/taka";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState, useEffect } from "react";

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

  const styleCss = `
    ::-webkit-scrollbar {
        width: 3px;
      }
  `;
  return (
    <motion.div
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ ease: "easeOut", duration: 1 }}
      className="min-h-max shadow-xl w-full overflow-hidden bg-gray-200 absolute top-10 left-0 right-0 z-10"
    >
      <style>{styleCss}</style>
      <h3 className="text-lg font-semibold mx-6 py-1">
        {result?.length} results for{" "}
        <span className="font-bold text-red-400">{search}</span>
      </h3>
      <div className="w-full flex flex-col gap-2 my-4  h-[500px] overflow-y-auto">
        {result?.map((res, idx) => (
          <Single key={idx} item={res} setSearch={setSearch} />
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
      className="flex  items-center bg-white rounded-lg border shadow-md flex-row mx-4 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        className="object-cover w-16 h-16 sm:w-24 sm:h-24 rounded-t-lg md:rounded-none md:rounded-l-lg"
        src={productImg + item?.image}
        alt=""
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <Link
          href={"/product/" + item?.id + "/" + item?.slug}
          onClick={() => setSearch("")}
          className="mb-2 capitalize text-sm sm:text-lg font-semibold tracking-tight text-gray-900 dark:text-white"
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
