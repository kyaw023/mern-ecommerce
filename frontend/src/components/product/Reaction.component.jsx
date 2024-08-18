import React, { useState } from "react";
import {
  FaThumbsUp,
  FaHeart,
  FaLaugh,
  FaRegHeart,
  FaAngry,
} from "react-icons/fa";

const ReactionComponent = () => {
  // State to manage visibility of reactions
  const [showReactions, setShowReactions] = useState(false);
  // State to manage the currently selected reaction
  const [selectedReaction, setSelectedReaction] = useState(null);

  // Toggle the visibility of reaction options
  const handleLikeClick = () => {
    setShowReactions(!showReactions);
  };

  // Set the selected reaction and hide options
  const handleReactionClick = (reaction) => {
    setSelectedReaction(reaction);
    setShowReactions(false); // Hide reactions after selection
  };
  return (
    <div className="relative">
      {/* Display selected reaction or default to 'like' */}
      <button
        className={`flex items-center space-x-1 p-2 rounded ${
          selectedReaction === "like" && "text-blue-500"
        }`}
        onClick={handleLikeClick}
      >
        {selectedReaction === "like" ? (
          <FaThumbsUp className="transition-transform duration-200 scale-125 " />
        ) : (
          <FaThumbsUp />
        )}
      </button>

      {/* Dropdown for other reactions */}
      {showReactions && (
        <div className="absolute flex space-x-1 mt-2 p-1 bg-white shadow-lg rounded-md border border-gray-300">
          <button
            className={`flex items-center space-x-1 p-2 rounded ${
              selectedReaction === "love" && "text-red-500"
            }`}
            onClick={() => handleReactionClick("love")}
          >
            {selectedReaction === "love" ? (
              <FaHeart className="transition-transform duration-200 scale-125" />
            ) : (
              <FaRegHeart />
            )}
          </button>

          <button
            className={`flex items-center space-x-1 p-2 rounded ${
              selectedReaction === "haha" && "text-yellow-500"
            }`}
            onClick={() => handleReactionClick("haha")}
          >
            {selectedReaction === "haha" ? (
              <FaLaugh className="transition-transform duration-200 scale-125" />
            ) : (
              <FaLaugh />
            )}
          </button>

          <button
            className={`flex items-center space-x-1 p-2 rounded ${
              selectedReaction === "care" && "text-pink-500"
            }`}
            onClick={() => handleReactionClick("care")}
          >
            {selectedReaction === "care" ? (
              <FaAngry className="transition-transform duration-200 scale-125" />
            ) : (
              <FaAngry />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReactionComponent;
