"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import "./card.css";
import { getPrice } from "@/app/utils/get-price";
import { getCampaign } from "@/app/utils/http/get-campaign";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { productImg } from "@/app/site-settings/siteUrl";
import Rate from "@/app/utils/rate";
import Taka from "@/app/utils/taka";
import { toast } from "react-toastify";

const Card5 = ({ item, store_id }: any) => {
  const [open, setOpen] = useState(false);
  const [camp, setCamp] = useState<any>(null);
  // const dispatch = useDispatch();

  const productGetPrice = getPrice(
    item.regular_price,
    item.discount_price,
    item.discount_type
  );
  const campPrice = getPrice(
    productGetPrice,
    parseInt(camp?.discount_amount),
    camp?.discount_type
  );

  useEffect(() => {
    async function handleCampaign() {
      try {
        const response: any = await getCampaign(item, store_id);
        if (!response?.error) {
          setCamp(response);
        } // the API response object
      } catch (error) {
        console.error(error);
      }
    }

    handleCampaign();
  }, [item, store_id]);

  const filterOfferProduct = (item: any) => {
    let cartItem = {};
    let productDetails = {
      id: item?.id,
      store_id,
    };
    toast("Added to Cart", {
      type: "success",
      autoClose: 1000,
    });

    axios
      .post(process.env.API_URL + "get/offer/product", productDetails)
      .then((res: any) => {
        if (!res?.error) {
          let itemRegularPrice = getPrice(
            item?.regular_price,
            item?.discount_price,
            item?.discount_type
          );
          let campaignPrice = getPrice(
            itemRegularPrice,
            parseInt(res?.discount_amount),
            res?.discount_type
          );

          cartItem = {
            cartId: uuidv4(),
            price: campaignPrice,
            color: null,
            size: null,
            additional_price: null,
            volume: null,
            unit: null,
            ...item,
          };
        } else {
          cartItem = {
            cartId: uuidv4(),
            price: productGetPrice,
            color: null,
            size: null,
            additional_price: null,
            volume: null,
            unit: null,
            ...item,
          };
        }
        // dispatch(addToCartList({ ...cartItem }));
      });
  };

  const add_cart_item = () => {
    if (item?.variant.length !== 0) {
      setOpen(!open);
    } else {
      filterOfferProduct(item);
    }
  };

  return (
    <div className="group rounded-md bg-white shadow-lg w-full h-full relative">
      {/* out of stock  */}
      {item?.quantity === "0" && (
        <Link href={"/product/" + item?.id + "/" + item?.slug}>
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1]">
            <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
              Out of Stock
            </p>
          </div>
        </Link>
      )}

      <div className="overflow-hidden grid grid-cols-2">
        <div className="w-full h-full">
          <img
            className="h-auto w-full"
            src={productImg + item.image[0]}
            alt="Mountain"
          />
        </div>

        <div className="px-5 flex flex-col justify-start mt-6">
          <div className="font-sans text-sm font-normal antialiased card5itemCategory">
            {item.category}
          </div>
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <div className=" text-base antialiased capitalize font-semibold truncate">
              {item?.name}
            </div>
          </Link>

          <div className="flex gap-x-1">
            <div>
              <Rate rating={item?.rating} />
            </div>
            <div className="text-gray-500 sm:text-sm text-xs">
              ({item?.number_rating})
            </div>
          </div>

          <div className="px-1 text-sm font-medium lg:group-hover:hidden">
            <Taka
              tk={camp?.status === "active" ? campPrice : productGetPrice}
            />
            {camp?.status !== "active" &&
            (item.discount_type === "no_discount" ||
              item.discount_price === "0.00") ? (
              " "
            ) : (
              <p className="line-through ">
                {" "}
                <Taka tk={Math.trunc(item.regular_price)} />
              </p>
            )}
          </div>
          <div
            onClick={add_cart_item}
            className="text-xs lg:cursor-pointer lg:hover:-translate-y-1 duration-1000 lg:hidden lg:group-hover:block font-semibold underline"
          >
            {store_id === 2669 ? "Buy Now" : "ADD TO CART"}
          </div>
        </div>
      </div>
      {/* <QuikView open={open} setOpen={setOpen}>
        <Details data={{ product_id: item?.id }} />
      </QuikView> */}
    </div>
  );
};

export default Card5;
