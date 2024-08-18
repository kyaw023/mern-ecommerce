import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Link } from "react-router-dom";

const PaginatioComponent = ({ state, page }) => {
  return (
    <Pagination className={" mt-10 w-full py-3"}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={"text-light-text dark:text-dark-text"}
            href="#"
          />
        </PaginationItem>

        {state?.links?.paginationLinks?.map((link, index) => {
          if (link?.number == page) {
            return (
              <PaginationItem key={link?.number}>
                <Link
                  className={
                    "rounded  border border-slate-400  px-3 py-1.5 bg-black text-slate-100 dark:text-dark-text"
                  }
                  to={`?page=${link?.number}`}
                  isActive
                >
                  {link?.number}
                </Link>
              </PaginationItem>
            );
          } else {
            return (
              <PaginationItem key={link?.number} className="rounded">
                <Link
                  to={`?page=${link?.number}`}
                  className="rounded  border border-slate-400  px-3 py-1.5 text-light-text dark:text-dark-text"
                >
                  {link?.number}
                </Link>
              </PaginationItem>
            );
          }
        })}

        <PaginationItem>
          <PaginationNext
            className={"text-light-text dark:text-dark-text"}
            href="#"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginatioComponent;
