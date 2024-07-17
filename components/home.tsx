import dynamic from "next/dynamic";

const Hero = dynamic(() => import("./hero"), { ssr: false });
const FeaturedCategory = dynamic(() => import("./featured-category"), {
  ssr: false,
});
const PromoBottom = dynamic(() => import("./promo-bottom"), { ssr: false });
const Product = dynamic(() => import("./product"), { ssr: false });
const NewArrival = dynamic(() => import("./new-arrival"), { ssr: false });
const BestSellerProduct = dynamic(() => import("./best-seller-product"), {
  ssr: false,
});
const FeatureProduct = dynamic(() => import("./feature-product"), {
  ssr: false,
});
const Testimonial = dynamic(() => import("./testimonial"), { ssr: false });
const Promo = dynamic(() => import("./promo"), { ssr: false });

const HomePage = ({ layoutx, queryDatax, design }: any) => {
  return (
    <>
      <div
        className={`${
          design?.template_id === "34" ? "bg-thirty-one" : "bg-white"
        } mx-auto`}
      >
        {layoutx &&
          layoutx.map((item: any, index: number) => (
            <GetComponent data={queryDatax} key={index} component={item} />
          ))}
      </div>
    </>
  );
};

const GetComponent = ({ component, data }: any) => {
  const {
    headersetting,
    slider,
    category,
    banner,
    product,
    best_sell_product,
    feature_product,
    testimonials,
    design,
    store_id,
    brand,
  } = data;

  switch (component) {
    case "hero_slider":
      return (
        <Hero slider={slider} theme={design?.hero_slider} design={design} />
      );
    case "feature_category":
      return (
        <FeaturedCategory
          theme={design?.feature_category}
          category={category}
          design={design}
          product={product}
          store_id={store_id}
        />
      );
    case "banner":
      return (
        <Promo
          design={design}
          store_id={store_id}
          theme={design?.banner}
          banner={banner}
        />
      );
    case "banner_bottom":
      return (
        <PromoBottom
          theme={design?.banner_bottom}
          banner={banner}
          brand={brand}
        />
      );
    case "product":
      return (
        <Product
          theme={design?.product}
          design={design}
          store_id={store_id}
          product={product}
          best_sell_product={best_sell_product}
          feature_product={feature_product}
          category={category}
          headerSetting={headersetting}
        />
      );
    case "new_arrival":
      return (
        <NewArrival
          product={product}
          theme={design?.new_arrival}
          design={design}
          store_id={store_id}
          category={category}
        />
      );
    case "best_seller_product":
      return (
        <BestSellerProduct
          theme={design?.best_sell_product}
          best_sell_product={best_sell_product}
          design={design}
          store_id={store_id}
          product={product}
          banner={banner}
        />
      );
    case "feature_product":
      return (
        <FeatureProduct
          theme={design?.feature_product}
          feature_product={feature_product}
          design={design}
          store_id={store_id}
          product={product}
          banner={banner}
        />
      );
    case "testimonial":
      return (
        <Testimonial
          testimonials={testimonials}
          theme={design?.testimonial}
          design={design}
        />
      );
  }
};

export default HomePage;
