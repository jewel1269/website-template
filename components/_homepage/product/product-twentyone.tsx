"use client";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import SectionHeadingTwentyOne from "@/components/section-heading/section-heading-twentyone";
import Card45 from "@/components/card/card45";

const ProductTwentyOne = ({
  category,
  design,
  store_id,
  headerSetting,
}: any) => {
  const [active, setActive] = useState(0);
  const [products, setProducts] = useState([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    async function handleCategory() {
      try {
        const response: any = await axios.post(
          "https://admin.ebitans.com/api/v1/" + `getcatproducts`,
          {
            id: category[id].id,
          }
        );

        if (!response?.error) {
          setProducts(response?.data?.data?.data);
        } // the API response object
        else {
          setProducts([]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    handleCategory();
  }, [category, id]);

  const styleCss = `
    .active-cat {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
 `;

  return (
    <div className="sm:container px-5 sm:py-10 py-5 w-full">
      <style>{styleCss}</style>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center pb-2">
        <div>
          <SectionHeadingTwentyOne title={"POPULAR"} subtitle={"PRODUCTS"} />
        </div>
        <div className="flex gap-x-5 lg:cursor-pointer uppercase text-sm font-medium text-gray-600 mt-5">
          {category?.slice(0, 3).map((item: any, index: any) => (
            <div key={item.id}>
              <h1
                className={`${
                  active === index ? "active-cat" : ""
                } px-2 py-1 rounded`}
                onClick={() => {
                  setActive(index);
                  setId(index);
                }}
              >
                {item.name}
              </h1>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[1px] w-full bg-gray-300 mb-5"></div>
      {products?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products?.slice(0, 8).map((productData: any) => (
            <div key={productData.id} className="">
              <Card45
                item={productData}
                design={design}
                store_id={store_id}
                headerSetting={headerSetting}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-red-500 text-center py-10 text-xl">
          No Products Available
        </div>
      )}
    </div>
  );
};

export default ProductTwentyOne;
