import react, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { getToken } from "../../utils/utilityFunctions";
import axios from "axios"

export default function Review({ tutorDetail, profileData, reviewsList }) {
    const [reviewList, setReviewList] = useState([])
    const [reviewText, setReviewtext] = useState("")
    const [ratingGiven, setRatinggiven] = useState(0)
    const [feedbackText, setFeedbacktext] = useState("")
    const [responseMessage, setResponseMessage] = useState("")


    useEffect(() => {
        setReviewList(reviewsList)
    }, [])


    const getReviewByTitorId = () => {
        const token = getToken()
        if (token) {
            const tutorId = tutorDetail.id
            const baseEndPoint = process.env.REACT_APP_API_END_POINT
            const apiEndPoint = baseEndPoint + "/api/reviews/getByTutor/" + tutorId

            axios.get(apiEndPoint, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
                .then(res => {
                    const rev = res.data
                    setReviewList(rev)

                })
                .catch((err) => {
                    setReviewList([])

                })
        }

    }

    useEffect(() => {
        setReviewList(reviewsList)
    }, [reviewsList])

    const onRatingChange = (rateValue) => {

        setRatinggiven(rateValue)
    }

    const onReviewSubmit = () => {
        const token = getToken()
        const class_id = tutorDetail.id + "_" + profileData.data.id
        const reqData = {
            class_review: reviewText,
            feedback_in_words: feedbackText,
            rating_by_student: ratingGiven,

        }

        const baseEndPoint = process.env.REACT_APP_API_END_POINT
        const apiEndPoint = baseEndPoint + "/api/reviews/" + class_id
        axios
            .patch(apiEndPoint, reqData, {
                headers: {
                    Authorization: "Bearer " + token
                },
            })
            .then((res) => {

                if (res.data.status === "success") {
                    setResponseMessage("Success")
                    getReviewByTitorId()
                } else {
                    setResponseMessage("Error")

                }

                setTimeout(() => {
                    setResponseMessage("")
                }, 3000)

            })
            .catch((err) => {
                setResponseMessage(
                    "error"
                )

                //setResponseData("Error")
            });

    }

    return (
        <div>
            <div>
                {/* //rating, feedback box , comment box and submit div */}

                {/* Rating */}

                <div class="height-100 container d-flex justify-content-end align-items-end">
                    <div class="p-3">
                        <div class="d-flex justify-content-between align-items-center">
                            {/* <div class="ratings"> <i class="fa fa-star rating-color"></i> <i class="fa fa-star rating-color"></i> <i class="fa fa-star rating-color"></i> <i class="fa fa-star rating-color"></i> <i class="fa fa-star"></i> </div> */}
                            {/* <h5 class="review-count">12 Reviews</h5> */}
                            <ReactStars count={5}
                                size={24}
                                onChange={onRatingChange}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa=star-half-alt"></i>}
                                fullIcon={<i className="fa fa-star"></i>}
                            />

                        </div>

                    </div>
                </div>

                {/* Review Box */}
                <div class="form-group">
                    <form>
                        <label for="exampleFormControlTextarea1">Review</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"
                            value={reviewText}
                            onChange={(e) => setReviewtext(e.target.value)}

                        ></textarea>
                    </form>
                </div>

                {/* Feedback Box */}

                <div class="form-group">

                    <label for="exampleFormControlTextarea1">Feedback</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"
                        value={feedbackText}
                        onChange={(e) => setFeedbacktext(e.target.value)}

                    ></textarea>

                </div>

                {/* Submit */}
                <div className="d-flex mt-2 mb-2 justify-content-end mt-2">

                    <button type="button" class="btn btn-secondary"
                        onClick={() => onReviewSubmit()}
                    >Submit</button>


                </div>


            </div>

            <div className="mb-5">
                <h5>Reviews</h5>
                {/* //previous rating, filtering */}

                {/* filtering */}
                {/* <div>//filtering</div> */}

                {/* previous ratings */}
                <div>
                    <ul class="list-group">
                        {reviewList.map((i, index) => {
                            return (

                                <li class="list-group-item"
                                    key={"comment_" + i.index}

                                >
                                    <p> Review: {i.class_review}</p>
                                    <p> Feedback: {i.feedback_in_words}</p>
                                    <p> Rating: {[...Array(i.rating_by_student)].map((r) => {
                                        return <i className="fa fa-star"></i>
                                    })}</p>
                                </li>
                            )
                        })}


                    </ul>
                </div>
            </div>
        </div>
    )
}