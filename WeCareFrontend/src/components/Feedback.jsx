import { useState } from "react";
import { putRating, addcomment } from "../services/UserService";
import ErrorBox from "./ErrorBox";
import SuccessBox from "./SuccessBox";

function Feedback({ app }) {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);

    const handleComments = () => {
        setLoader(true);
        addcomment({ userid: app.userid, coachid: app.coachid, comment })
            .then((response) => {
                if (response.data) {
                    setMessage("Comment added successfully!");
                    setSuccess(true);
                    setError(false);
                } else {
                    setMessage("Failed to add comment.");
                    setSuccess(false);
                    setError(true);
                }
            })
            .catch(() => {
                setMessage("Error while adding comment.");
                setSuccess(false);
                setError(true);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    const handleRatings = () => {
        if (rating === 0) {
            setMessage("Please select a rating before submitting.");
            setError(true);
            setSuccess(false);
            return;
        }

        setLoader(true);
        putRating({ userid: app.userid, coachid: app.coachid, rating })
            .then((response) => {
                if (response.data) {
                    setMessage("Rating submitted successfully!");
                    setSuccess(true);
                    setError(false);
                } else {
                    setMessage("Failed to submit rating.");
                    setSuccess(false);
                    setError(true);
                }
            })
            .catch(() => {
                setMessage("Error while submitting rating.");
                setSuccess(false);
                setError(true);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    return (
        <div className="container mt-4">
            <h4>Leave Feedback</h4>
            {success && <SuccessBox message={message} onClose={()=>setSuccess(false)}/>}
            {error && <ErrorBox message={message} onClose={()=>setError(false)}/>}

            <div className="form-group my-3">
                <label htmlFor="comment">Comment:</label>
                <textarea
                    id="comment"
                    className="form-control"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your comment here..."
                    rows="3"
                />
            </div>

            <button
                className="btn btn-primary me-2"
                onClick={handleComments}
                disabled={loader || comment.trim() === ""}
            >
                {loader ? "Submitting..." : "Submit Comment"}
            </button>

            <div className="form-group mt-4">
                <label>Rating:</label>
                <div className="star-rating mt-2">
                    {[...Array(5)].map((star, index) => {
                        const currentRating = index + 1;
                        return (
                            <span
                                key={index}
                                className="star"
                                onClick={() => setRating(currentRating)}
                                onMouseEnter={() => setHover(currentRating)}
                                onMouseLeave={() => setHover(0)}
                                style={{
                                    fontSize: "2rem",
                                    cursor: "pointer",
                                    color:
                                        currentRating <= (hover || rating)
                                            ? "#ffc107"
                                            : "#e4e5e9",
                                }}
                            >
                                ★
                            </span>
                        );
                    })}
                </div>
            </div>

            <button
                className="btn btn-success mt-2"
                onClick={handleRatings}
                disabled={loader || rating === 0}
            >
                {loader ? "Submitting..." : "Submit Rating"}
            </button>
        </div>
    );
}

export default Feedback;
