import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import photo from "../../lottie/noCart.json";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import { LoadingComponent, NoDataComponent } from "../../components";

import { Label } from "../../components/ui/label";

import { Textarea } from "../../components/ui/textarea";
import { Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const CartPage = () => {
  const { state, dispatch } = useContext(CartContext);

  const removeCartHandler = async (id) => {
    try {
      const res = await axios.delete(`/api/carts/${id}/add-cart`);
      dispatch({ type: "REMOVE_FROM_CART", payload: id });
      if (res.status === 200) {
        toast.success(`Product successfully removed from the cart`);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const decreaseHandler = async (id, quantity) => {
    if (quantity === 1) {
      removeCartHandler(id);
    } else {
      try {
        await axios.patch(`/api/carts/decreaseQuantity`, {
          id,
          quantity: 1,
        });
        dispatch({ type: "DECREMENT_QUANTITY", payload: id });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const increaseHandler = async (id) => {
    try {
      await axios.patch(`/api/carts/increaseQuantity`, {
        id,
        quantity: 1,
      });

      dispatch({ type: "INCREMENT_QUANTITY", payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  const total = state?.carts.reduce(
    (ac, cv) => ac + cv.quantity * cv.product.price,
    0
  );

  return (
    <LoadingComponent isLoading={state?.loading}>
      <NoDataComponent data={state?.carts} photo={photo}>
        <div className=" mt-14 md:mt-0 px-2 md:px-0 h-screen ">
          <h1 className=" text-xl font-semibold  dark:text-slate-50">
            My Cart
          </h1>

          <div className=" grid md:grid-cols-5 grid-cols-1  gap-6 mt-3">
            <div className=" col-span-3 border px-4 rounded-lg dark:bg-slate-950">
              <Table className=" ">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[400px]">Product</TableHead>
                    <TableHead className=" text-right">Quantity</TableHead>
                    <TableHead className=" text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className=" ">
                  {state?.carts?.map((item) => {
                    return (
                      <TableRow key={item?._id}>
                        <TableCell className="font-medium">
                          <Link
                            to={`/detail/${item?.product?._id}`}
                            className=" flex space-x-2"
                          >
                            <img
                              className=" w-24 h-24 object-contain rounded border"
                              src={
                                `http://localhost:4000${item?.product?.images}` ||
                                item?.product?.images
                              }
                              alt=""
                            />
                            <span className=" mt-2 dark:text-slate-100">
                              {item?.product?.name}
                            </span>
                          </Link>
                        </TableCell>
                        <TableCell className=" text-right">
                          <div className=" flex items-center justify-between px-3 border rounded-lg py-2 ">
                            <button
                              onClick={() =>
                                decreaseHandler(item?._id, item?.quantity)
                              }
                              className=" text-lg"
                            >
                              <Minus
                                className=" dark:text-slate-100"
                                size={16}
                              />
                            </button>
                            <span className=" dark:text-slate-100">
                              {item?.quantity}
                            </span>
                            <button onClick={() => increaseHandler(item?._id)}>
                              <Plus
                                className=" dark:text-slate-100"
                                size={16}
                              />
                            </button>
                          </div>
                          <button
                            onClick={() => removeCartHandler(item?._id)}
                            className=" text-xs text-slate-600 "
                          >
                            Remove
                          </button>
                        </TableCell>
                        <TableCell className=" text-right dark:text-slate-50">
                          ${" "}
                          {(
                            item?.product?.price * parseInt(item?.quantity)
                          ).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <div>
              <Card className="w-[350px]">
                <CardHeader>
                  <CardTitle className=" flex items-center justify-between">
                    <h1>Total</h1>
                    <h1>{total.toFixed(2)}</h1>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Order Instructions</Label>
                        <Textarea
                          className=" resize-none"
                          id="name"
                          placeholder=""
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between gap-2">
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                  <Link to={"/checkout-form"}>
                    <Button>Saved</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </NoDataComponent>
    </LoadingComponent>
  );
};

export default CartPage;
