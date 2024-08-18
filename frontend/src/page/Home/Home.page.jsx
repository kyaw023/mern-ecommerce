import React, { useContext, useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { useLocation } from "react-router-dom";

import {
  FeaturedComponent,
  FooterComponent,
  LoadingComponent,
  PaginationComponent,
  ProductCardComponent,
} from "../../components";
import { ProductContext } from "../../context/ProductContext";
import HeroImg from "../../assets/jayy-torres-9O9yjWUHHRE-unsplash-removebg.png";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [links, setLinks] = useState([]);

  const location = useLocation();

  const searchQuery = new URLSearchParams(location.search);

  let page = searchQuery.get("page");

  page = parseInt(page) ? parseInt(page) : 1;

  const { state, dispatch, fetchProducts } = useContext(ProductContext);

  useEffect(() => {
    fetchProducts(page);
  }, [page, fetchProducts]);

  useEffect(() => {
    setProducts(state.products);
    setLinks(state.links);
  }, [state.products, state.links, fetchProducts]);

  return (
    <LoadingComponent isLoading={state?.loading}>
      <div className="py-10 dark:bg-dark-background bg-light-background px-2 md:px-0">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-0 mt-10 md:mt-0">
          <div className="max-w-lg text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4">
              Discover the Best in Tech and Fashion
            </h1>
            <p className="text-sm text-slate-600 dark:text-dark-accent mb-8">
              Shop our top selection of phones, sneakers, and headphones. Find
              the perfect blend of style and technology to suit your lifestyle.
              Enjoy great deals and fast shipping on all your favorite products!
            </p>
            <Button>Shop Now</Button>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={HeroImg}
              alt="Phone"
              className="object-cover rounded-lg h-[540px] w-[540px]"
            />
          </div>
        </section>

        {/* Products Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">
            All Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {products?.map((product) => (
              <div key={product?._id}>
                <ProductCardComponent {...product} />
              </div>
            ))}
          </div>
        </section>

        {/* Pagination */}
        <section className="mt-10">
          <PaginationComponent state={state} page={page} />
        </section>

        {/* Featured and Footer */}
        <section className="mt-16">
          <FeaturedComponent />
          <FooterComponent />
        </section>
      </div>
    </LoadingComponent>
  );
};

export default HomePage;
