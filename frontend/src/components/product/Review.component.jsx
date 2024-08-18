import React, { useContext, useEffect, useState } from "react";
import axios from "../../helpers/axios";
import LoadingComponent from "../loading/Loading.component";
import { AuthContext } from "../../context/AuthContext";
import ReviewCardComponent from "./ReviewCard.component";


const ReviewComponent = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const [reviewId, setReviewId] = useState(null);

  const { state } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await axios.get(`/api/reviews/${id}`);
      setReviews(res.data);
      setIsLoading(false);
    })();
  }, []);

  const changeHandler = (e) => {
    setComments(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (isEdit) {
      const res = await axios.patch(`/api/reviews/${reviewId}`, {
        text: comments,
      });

      if (res.status === 200) {
        setComments("");
        setReviews((prev) =>
          prev.map((review) =>
            review?._id === reviewId ? { ...review, text: comments } : review
          )
        );
        setIsEdit(false);
      }
    } else {
      const comment = {
        productId: id,
        userId: state?.user?._id,
        reviews: comments,
      };
      const res = await axios.post("/api/reviews", comment);

      if (res.status === 200) {
        setReviews([...reviews, res.data]);
        setComments("");
      }
    }
  };

  return (
    <LoadingComponent isLoading={isLoading}>
      <div className=" grid-cols-3 grid gap-2">
        <div className=" col-span-2">
          <ReviewCardComponent
            reviews={reviews}
            setReviews={setReviews}
            state={state}
            submitHandler={submitHandler}
            comments={comments}
            changeHandler={changeHandler}
            setComments={setComments}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            setReviewId={setReviewId}
          />
        </div>
      </div>
    </LoadingComponent>
  );
};

export default ReviewComponent;
