import React, { useEffect, useState } from "react"
import TutorCard from "../Tutor/TutorCard"
import axios from "axios"


export default function TutorRating({ tutors }) {

    const [sortedTutors, setSortedTutors] = useState([])

    useEffect(() => {

        handleRatingsData()
    }
        , [tutors])

    const handleRatingsData = () => {
        const baseEndPoint = process.env.REACT_APP_API_END_POINT
        const apiEndPoint = baseEndPoint + "/api/reviews"

        axios.get(apiEndPoint, {

        })
            .then((res) => {
                const allReviewData = res.data

                if (allReviewData && tutors) {

                    const tutorWithReview = tutors.map((tutor) => {
                        const currentTutorReviews = allReviewData.filter((rev) => rev.tutor_id === tutor.id)

                        const totalRating = currentTutorReviews.reduce(function (accumulator, curValue) {

                            const rating = curValue.rating_by_student ? +curValue.rating_by_student : 0

                            return accumulator + rating
                        }, 0)
                        const lenOfAllRating = currentTutorReviews.length
                        const avgRating = totalRating / lenOfAllRating
                        return {
                            ...tutor,
                            avgRating: avgRating ? avgRating : 0
                        }

                    })
                    console.log("here", tutorWithReview)
                    const sortedList = tutorWithReview.sort((a, b) => b.avgRating - a.avgRating)
                    setSortedTutors(sortedList)

                }




            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (

        <>
            <div className="mt-4">
                <h5 className="justify-left  text-primary mb-2">Top Rated Tutor</h5>
                <div className="row">
                    {sortedTutors.length > 0 ?
                        sortedTutors.map((item, index) => {
                            return (
                                <div
                                    key={item.id}
                                    className="col-md-3 mb-2 col-sm-12"
                                >
                                    <TutorCard
                                        tutorDetail={item}
                                    />
                                </div>
                            )
                        })
                        : "No Result"}
                </div>
            </div>
        </>
    )
}