import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../helpers/axios";
import {
  LoadingComponent,
  NoDataComponent,
  ProductCardComponent,
} from "../../components";
import { toast } from "sonner";
import photo from "../../lottie/noFav.json";
import { FavoriteContext } from "../../context/FavoriteContext";

const FavoritePage = () => {
  
  const [loading, setLoading] = useState(false);
  const { state } = useContext(AuthContext);
  const { state: favoriteLists } = useContext(FavoriteContext);

 
  return (
    <div>
      <h1 className="text-3xl font-semibold dark:text-slate-50 mb-4">
        FavoritePage
      </h1>

      <LoadingComponent isLoading={loading}>
        <NoDataComponent data={favoriteLists?.favorites} photo={photo}>
          <div className=" grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5">
            {favoriteLists?.favorites?.map((product) => {
              console.log(product);
              return (
                <div key={product?._id}>
                  <ProductCardComponent {...product} />
                </div>
              );
            })}
          </div>
        </NoDataComponent>
      </LoadingComponent>
    </div>
  );
};

export default FavoritePage;
