
import { Link } from "react-router-dom";
import { LoadingComponent } from "../../components";
const categories = [
  {
    name: "Sneakers",
    description: "Shop now",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Computers",
    description: "Shop now",
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Clothes",
    description: "Shop now",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1675186049222-0b5018db6ce9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Smartphones",
    description: "Shop now",
    imageUrl:
      "https://images.unsplash.com/photo-1574763788197-1808b6ac8142?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Smartwatches",
    description: "Shop now",
    imageUrl:
      "https://images.unsplash.com/photo-1722153768985-9286321b8769?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Beauty",
    description: "Shop now",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1684407616442-8d5a1b7c978e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Sport",
    description: "Shop now",
    imageUrl:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
const CategoryPage = () => {
  return (
    <LoadingComponent>
      <div className="bg-light-background dark:bg-dark-background py-12 mt-10 md:mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-baseline sm:justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight text-light-text dark:text-dark-text">
              Shop by Category
            </h2>
            <a
              href="#"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Browse all categories &rarr;
            </a>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {categories.slice(0, 6).map((category, index) => (
              <div
                key={category.name}
                className={`group relative ${
                  index === 0
                    ? "sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-1"
                    : "sm:col-span-1 sm:row-span-1"
                }`}
              >
                <div className="relative w-full h-64 bg-light-card dark:bg-dark-card rounded-lg overflow-hidden group-hover:opacity-75 sm:h-80 lg:h-96">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-center object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-25"></div>
                  <div className="absolute inset-0 flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        <Link to={"/search"}>
                          <span className="absolute inset-0" />
                          {category.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-white mt-1">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {categories.slice(6, 7).map((category) => (
              <div
                key={category.name}
                className="group relative sm:col-span-3 sm:row-span-1"
              >
                <div className="relative w-full h-64 bg-light-card dark:bg-dark-card rounded-lg overflow-hidden group-hover:opacity-75 sm:h-80 lg:h-96">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-center object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-25"></div>
                  <div className="absolute inset-0 flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        <Link to={"/search"}>
                          <span className="absolute inset-0" />
                          {category.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-white mt-1">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LoadingComponent>
  );
};

export default CategoryPage;
