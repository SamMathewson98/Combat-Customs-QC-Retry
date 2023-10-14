import React, { useState } from 'react';
import axios from 'axios';

function WriteReview({ itemId, name }) {
  const [reviewText, setReviewText] = useState('');
  const [isReviewSent, setIsReviewSent] = useState(false);
  const [isError, setIsError] = useState(false); // Add a state variable for errors

  const writeReview = async (e) => {
    e.preventDefault();

    try {
        const review = {
          _id: itemId,
          name: name,
          text: reviewText
        }

        console.log(review);

      const response = await axios.post(`http://localhost:3002/api/post-review`, review);

      // Handle the response from the server as needed
      console.log(response.data);

      // Set the state to indicate that the review was sent successfully
      setIsReviewSent(true);
      setIsError(false); // Clear any previous error message
    } catch (error) {
      console.error(error);

      // Set the state to indicate that an error occurred
      setIsReviewSent(false);
      setIsError(true);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReviewText(value);
  };

  const handleTextAreaChange = (event) => {
    const textarea = event.target;
    textarea.style.height = 'auto'; // Reset the height to auto
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
  };

  return (
    <div>
      {isReviewSent ? (
        <div className='submitted-successfully'>
        <p className="success-message text-mounting">Review sent!</p>
        </div>
      ) : (
        <>
          {isError && <p className="error-message text-mounting">Error sending review</p>} {/* Display error message if isError is true */}
          <form onSubmit={writeReview} className='review-form'>
            <label htmlFor="review">Leave a Review: </label>
            <textarea id="review" name="review" value={reviewText} onInput={handleTextAreaChange} rows="1" onChange={handleChange} />
            <button type="submit" className='FormElement'>Post Review</button>
          </form>
        </>
      )}
    </div>
  );
}

export default WriteReview;
