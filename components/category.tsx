// "use client";
import React from "react";
import CategoryThree from "./_category-page/category/category-three";
import CategorySevenNew from "./_category-page/category/category-seven-new";
import getUrl from "@/utils/get-url";
import { getSubdomainName } from "@/lib";

const SubCategoryComponent = async () => {
  const url = getUrl();
  const {
    design: { shop_page },
  } = await getSubdomainName(url, "design");
  return (
    <>
      {shop_page === "seven" && <CategorySevenNew />}
      {shop_page === "default" && <CategoryThree />}
    </>
  );
};

export default SubCategoryComponent;
