import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import axios from "../../helpers/axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "sonner";
import { useEffect } from "react";

export default function BasicRating({ rate, productId, editable = false }) {
  const { state } = useContext(AuthContext);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof rate === "number" && !isNaN(rate)) {
      setValue(Math.ceil(rate));
    }
  }, [rate]);

  const changeHandler = async (event, newValue) => {
    setValue(newValue); // Optimistic UI update
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("/api/rating", {
        product: productId,
        user: state?.user?._id,
        rating: newValue,
      });
      if (res.status === 200) {
        toast.success("Rating submitted successfully!");
      }
    } catch (err) {
      console.error(err);
      setError("Cannot Edit");
      setValue(rate); // Revert UI update if the API call fails
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
        ".MuiRating-iconFilled": {
          color: "var(--rating-icon-filled, red)",
        },
        ".MuiRating-iconHover": {
          color: "var(--rating-icon-hover, lightcoral)",
        },
      }}
    >
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <Rating
        name="simple-controlled"
        value={value}
        onChange={editable ? changeHandler : null}
        readOnly={!editable}
        sx={{
          "& .MuiRating-iconFilled": {
            color: "var(--rating-icon-filled)",
          },
          "& .MuiRating-iconHover": {
            color: "var(--rating-icon-hover)",
          },
        }}
      />
    </Box>
  );
}
