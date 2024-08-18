import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import NoDataComponent from "../Empty/NoData.component";
import photo from "../../lottie/noData.json";
import axios from "../../helpers/axios";

const ReviewCardComponent = ({
  reviews,
  state,
  setReviews,
  comments,
  submitHandler,
  changeHandler,
  setComments,
  isEdit,
  setIsEdit,
  setReviewId,
}) => {
  const [reply, setReply] = useState("");
  const [replyEdit, setReplyEdit] = useState("");
  const [replyId, setReplyId] = useState(null);

  const ref = useRef();

  const editHandler = (comment, id) => {
    setIsEdit(true);
    setReviewId(id);
    ref.current.focus();
    setComments(comment);
  };

  const deleteHandler = async (id) => {
    const res = await axios.delete(`/api/reviews/${id}`);

    if (res.status === 200) {
      setReviews((prev) => prev.filter((review) => review?._id !== id));
    }
  };

  const cancelHandler = () => {
    setIsEdit(false);
    setReviewId("");
    setComments("");
  };

  const replyHandler = (id) => {
    setReplyId(id);
  };

  const replyChangeHandler = (e) => {
    setReply(e.target.value);
  };

  const replySubmitHandler = async (e, id) => {
    e.preventDefault();

    if (replyEdit) {
      // const res = await axios.patch(`/api/reviews/${}`, {
      //   text: comments,
      // });
      // if (res.status === 200) {
      //   setComments("");
      //   setReviews((prev) =>
      //     prev.map((review) =>
      //       review?._id === reviewId ? { ...review, text: comments } : review
      //     )
      //   );
      //   setIsEdit(false);
      // }
    } else {
      const replies = {
        reviewId: id,
        userId: state?.user?._id,
        text: reply,
      };

      console.log(replies);
      const res = await axios.post("/api/reply", replies);

      console.log(res);

      if (res.status === 200) {
        setReviews((prev) => {
          return prev.map((review) => {
            if (review._id === replyId) {
              return {
                ...review,
                replies: [...review.replies, res.data],
              };
            }
            return review;
          });
        });
        setReply("");
        setReplyId(null);
      }
    }
  };

  const cancelReplyHandler = () => {
    setReply("");
    setReplyId(null);
  };

  return (
    <section className="bg-white dark:bg-transparent py-8  antialiased">
      <div className="md:max-w-4xl md:mx-auto px-4">
        <form onSubmit={submitHandler} className="mb-6 w-[354px] md:w-auto">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              ref={ref}
              id="comment"
              value={comments}
              onChange={changeHandler}
              rows={6}
              className="px-0  w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required=""
            />
          </div>
          <div className=" space-x-2">
            <button
              type="submit"
              className="inline-flex border bg-blue-500 items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              {isEdit ? " Update comment" : " Post comment"}
            </button>
            <Button type="button" onClick={cancelHandler} variant="outline">
              Cancel
            </Button>
          </div>
        </form>
        {reviews?.map((review) => {
          return (
            <div key={review?._id}>
              <article className="w-[354px] md:w-auto text-base bg-white rounded-lg dark:bg-gray-900">
                <div>
                  <footer className="flex justify-between items-center mb-2 p-3 border rounded shadow-sm">
                    <div className="flex flex-col md:flex-row items-center ">
                      <div className=" flex items-center">
                        <img
                          className="md:w-6 md:h-6 w-10 h-10 rounded-full"
                          src={
                            import.meta.env.VITE_BACKEND_ASSET_URL +
                            review?.userId?.image
                          }
                          alt="Michael Gough"
                        />
                        {review?.userId?.name}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <time
                          pubdate=""
                          dateTime="2022-02-08"
                          title="February 8th, 2022"
                        >
                          Feb. 8, 2022
                        </time>
                      </p>
                    </div>
                    {state?.user?._id === review?.userId?._id && (
                      <div className=" space-x-2">
                        <Button
                          onClick={() => editHandler(review?.text, review?._id)}
                          size="sm"
                          variant="outline"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => deleteHandler(review?._id)}
                          size="sm"
                          className=" bg-red-500"
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </footer>
                  <p className="text-gray-500 dark:text-gray-400">
                    {review?.text}
                  </p>
                </div>
                <div className="flex items-center mt-4 space-x-4">
                  <button
                    type="button"
                    onClick={() => replyHandler(review?._id)}
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                  >
                    <svg
                      className="mr-1.5 w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                      />
                    </svg>
                    Reply
                  </button>
                </div>
                <div>
                  {replyId === review?._id && (
                    <form
                      onSubmit={(e) => replySubmitHandler(e, review?._id)}
                      className="mt-6 max-w-md"
                    >
                      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label htmlFor="comment" className="sr-only">
                          Your Reply
                        </label>
                        <textarea
                          ref={ref}
                          id="comment"
                          value={reply}
                          onChange={replyChangeHandler}
                          rows={6}
                          className="px-0  w-full h-28 resize-none text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                          placeholder="Write a comment..."
                          required=""
                        />
                      </div>
                      <div className=" space-x-2">
                        <button
                          type="submit"
                          className="inline-flex border bg-blue-500 items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                        >
                          Reply
                        </button>
                        <Button
                          type="button"
                          onClick={cancelReplyHandler}
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </article>
              {/* reivew replies */}
              {review?.replies.map((rp) => {
                return (
                  <article
                    key={rp?._id}
                    className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900"
                  >
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className=" flex flex-col   items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                          <img
                            className="mr-2 w-10 h-10 rounded-full"
                            src={
                              import.meta.env.VITE_BACKEND_ASSET_URL +
                              rp?.userId?.image
                            }
                            alt="Jese Leos"
                          />
                          {rp?.userId?.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <time
                            pubdate=""
                            dateTime="2022-02-12"
                            title="February 12th, 2022"
                          >
                            Feb. 12, 2022
                          </time>
                        </p>
                      </div>
                      {state?.user?._id === rp.userId?._id && (
                        <div className=" space-x-2">
                          <Button
                            onClick={() =>
                              editHandler(review?.text, review?._id)
                            }
                            size="sm"
                            variant="outline"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => deleteHandler(review?._id)}
                            size="sm"
                            className=" bg-red-500"
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                      <div></div>
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">
                      {rp?.text}
                    </p>
                    <div className="flex items-center mt-4 space-x-4">
                      <button
                        onClick={replyHandler}
                        type="button"
                        className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                      >
                        <svg
                          className="mr-1.5 w-3.5 h-3.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                          />
                        </svg>
                        Reply
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ReviewCardComponent;
