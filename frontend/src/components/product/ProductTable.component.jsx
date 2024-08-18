import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Button } from "../ui/button";

const ProductTableComponent = ({ state, editHandler, deleteHandler }) => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Item</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className=" text-right">Price</TableHead>
            <TableHead className=" text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className=" ">
          {state?.products?.map((product) => {
            return (
              <TableRow key={product?._id}>
                <TableCell className="font-medium">
                  <div>
                    <img
                      className=" w-10 h-10 rounded"
                      src={
                        `http://localhost:4000${product.images}` ||
                        product.images
                      }
                      alt=""
                    />
                    <span className=" mt-2">{product?.name}</span>
                  </div>
                </TableCell>
                <TableCell>{product?.category?.name}</TableCell>
                <TableCell>{product?.stock}</TableCell>
                <TableCell className=" text-right">${product?.price}</TableCell>
                <TableCell className="text-right">
                  <div className=" space-x-2 flex items-center justify-end ">
                    <Button
                      onClick={() => editHandler(product)}
                      variant="outline"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteHandler(product?._id)}
                      size="sm"
                      className=" bg-red-600 dark:bg-red-600 dark:text-slate-200  dark:hover:bg-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTableComponent;
