import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({onRatingChange}) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const handleRatingClick = (ratingValue) => {
        setRating(ratingValue);
        onRatingChange(ratingValue);
    };

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label key={ratingValue}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => handleRatingClick(ratingValue)}
                            style={{display: 'none'}}
                        />
                        <FaStar
                            className="star"
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            size={40}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;
