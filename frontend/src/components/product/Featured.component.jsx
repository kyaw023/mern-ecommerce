import React from "react";

const features = [
  { name: "Fabric", description: "100% Organic Cotton" },
  {
    name: "Care Instructions",
    description: "Machine wash cold, tumble dry low, do not bleach",
  },
  { name: "Fit", description: "Regular fit" },
  { name: "Sizes", description: "Available in XS, S, M, L, XL" },
  { name: "Colors", description: "Available in multiple colors" },
  {
    name: "Sustainability",
    description: "Made with sustainable materials and ethical labor practices",
  },
];

const FeaturedComponent = () => {
  return (
    <div className="bg-light-background dark:bg-dark-background">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 py-24 px-2 md:px-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-light-text dark:text-dark-text sm:text-4xl">
            Technical Specifications
          </h2>
          <p className="mt-4 text-light-text dark:text-dark-text">
            The walnut wood card tray is precision milled to perfectly fit a
            stack of Focus cards. The powder-coated steel divider separates
            active cards from new ones, or can be used to archive important task
            lists.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="border-t border-light-accent dark:border-dark-accent pt-4"
              >
                <dt className="font-medium text-light-text dark:text-dark-text">
                  {feature.name}
                </dt>
                <dd className="mt-2 text-sm text-light-text dark:text-dark-text">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            alt="Walnut card tray with white powder-coated steel divider and 3 punchout holes."
            src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D"
            className="rounded-lg bg-light-card dark:bg-dark-card"
          />
          <img
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D"
            className="rounded-lg bg-light-card dark:bg-dark-card"
          />
          <img
            alt="Side of walnut card tray with card groove and recessed card area."
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="rounded-lg bg-light-card dark:bg-dark-card"
          />
          <img
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            src="https://plus.unsplash.com/premium_photo-1671198905435-20f8d166efb2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="rounded-lg bg-light-card dark:bg-dark-card"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedComponent;
