import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { ProductCardComponent } from "../../components";

const sortOptions = [
  { name: "Most Popular", value: "most_popular", current: true },
  { name: "Best Rating", value: "best_rating", current: false },
  { name: "Newest", value: "newest", current: false },
  { name: "Price: Low to High", value: "price_low_to_high", current: false },
  { name: "Price: High to Low", value: "price_high_to_low", current: false },
];

const filters = [
  {
    id: "brand",
    name: "Brand",
    options: [
      { value: "H&M", label: "H&M", checked: false },
      { value: "msi", label: "MSI", checked: false },
      { value: "nike", label: "Nike", checked: true },
      { value: "adidas", label: "Adidas", checked: false },
      { value: "samsung", label: "Samsing", checked: false },
      { value: "apple", label: "Apple", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "sneakers", label: "Sneakers", checked: false },
      { value: "smartphones", label: "SmartPhones", checked: false },
      { value: "electronics", label: "Electronics", checked: true },
      { value: "clothes", label: "Clothes", checked: false },
      { value: "computers", label: "Computers", checked: false },
      { value: "beauty", label: "Beauty", checked: false },
      { value: "sport", label: "Sports", checked: false },
      { value: "smartwatch", label: "Smart Watch", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false); // Initialize state
  const location = useLocation();
  const [selectedSortOption, setSelectedSortOption] = useState("most_popular");

  useEffect(() => {
    setProducts(location.state);
  }, [location.state]);

  // Initialize state to keep track of checked options
  const [checkedOptions, setCheckedOptions] = useState({});

  // Handle change event for checkboxes
  const handleCheckboxChange = (sectionId, optionValue) => {
    setCheckedOptions((prevState) => {
      const currentChecked = prevState[sectionId] || [];
      if (currentChecked.includes(optionValue)) {
        // Remove option if it's already checked
        return {
          ...prevState,
          [sectionId]: currentChecked.filter((value) => value !== optionValue),
        };
      } else {
        // Add option if it's not checked
        return {
          ...prevState,
          [sectionId]: [...currentChecked, optionValue],
        };
      }
    });
  };

  const buildQueryString = (filters) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach((sectionId) => {
      filters[sectionId].forEach((value) => {
        params.append(sectionId, value);
      });
    });
    return params.toString();
  };

  const performSearch = async () => {
    const filterQueryString = buildQueryString(checkedOptions);
    try {
      console.log("Search query:", searchQuery);
      console.log("Selected sort option:", selectedSortOption);
      console.log("Filter query string:", filterQueryString);
      const response = await axios.get(
        `/api/search?q=${searchQuery}&sort=${selectedSortOption}&${filterQueryString}`
      );
      console.log("Response data:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await performSearch();
    setSearchQuery("");
  };

  const handleSortChange = (value) => {
    console.log("Sort option selected:", value);
    setSelectedSortOption(value);
    performSearch(); // Trigger search with the new sort option
  };

  console.log(products);
  return (
    <div className="bg-white dark:bg-transparent">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
          <div className="fixed inset-0 z-40 flex ">
            <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>

                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              value={option.value}
                              checked={
                                checkedOptions[section.id]?.includes(
                                  option.value
                                ) || false
                              }
                              onChange={() =>
                                handleCheckboxChange(section.id, option.value)
                              }
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 md:mt-0">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
              Product Filter
            </h1>

            {/* sort */}
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-slate-300">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-slate-800 dark:text-slate-300 shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value}>
                      {({ active }) => (
                        <button
                          onClick={() => handleSortChange(option.value)}
                          className={classNames(
                            option.value === selectedSortOption
                              ? "bg-gray-100 text-gray-900 dark:bg-slate-800 dark:text-slate-300"
                              : "text-gray-700 dark:bg-slate-800 dark:text-slate-300",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          {option.name}
                        </button>
                      )}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                  onClick={() => setMobileFiltersOpen(true)}
                />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className=" pt-4">
            {/* search */}
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-4">
              <form onSubmit={handleSearch} className="flex">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products"
                  className="mr-4 text-slate-200"
                />
                <Button
                  className=" dark:bg-slate-900 dark:border dark:border-slate-500 dark:text-slate-300"
                  type="submit"
                >
                  Search
                </Button>
              </form>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 mt-2 md:mt-0">
              {/* Filters */}
              <form className=" border px-4 rounded border-slate-500 h-[760px] md:h-[500px] py-3">
                <h3 className="sr-only">Categories</h3>

                {filters?.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 dark:border-slate-500  py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="flex w-full items-center justify-between bg-white dark:bg-transparent py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900 dark:text-slate-300 ">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            className="h-5 w-5 group-data-[open]:hidden"
                            aria-hidden="true"
                          />
                          <MinusIcon
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                            aria-hidden="true"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section?.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              value={option.value}
                              checked={
                                checkedOptions[section.id]?.includes(
                                  option.value
                                ) || false
                              }
                              onChange={() =>
                                handleCheckboxChange(section.id, option.value)
                              }
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="ml-3 text-sm text-gray-600 dark:text-gray-300"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}

                <Button
                  className="w-full dark:bg-slate-900 dark:border dark:border-slate-500 dark:text-slate-300 mt-4 md:mt-0"
                  onClick={handleSearch}
                  type="submit"
                >
                  Filter
                </Button>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-4">
                <div className="bg-white dark:bg-transparent">
                  <div className="mx-auto max-w-2xl px-4 pt-0 pb-8 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-200">
                      Products
                    </h2>
                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                      {products?.length > 0 ? (
                        products?.map((product) => (
                          <ProductCardComponent {...product} />
                        ))
                      ) : (
                        <div>
                          <p>Products Are Coming Soon...</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default SearchPage;
