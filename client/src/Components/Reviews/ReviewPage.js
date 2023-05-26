import React, { useContext, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import MoviesApi from "../Data/MoviesApi";
import { movieActions } from "../Redux/MovieSlice";
// import { movieContext } from "../MoviesDataContext/Moviesdata";
import { userContext } from "../USERCONTEXT/UserContext";
const ReviewPage = (props) => {

  const {user}=useContext(userContext)
  const dispatch=useDispatch()
  // const {addReview}=useContext(movieContext)
  const Id = new Date().getDate() + "" + new Date().getTime();
  const reviewDate =
    new Date().getDate() +
    "-" +
    new Date().getMonth() +
    "-" +
    new Date().getFullYear();
  const [reviews, setReviews] = useState(props.movie.reviews);
  const [newReview, setNewReview] = useState({
    id: Id,
    rating: 0,
    review: "",
    userId: props.user._id,
    userName: props.user.FirstName,
    reviewDate: reviewDate,
  });


  const submitReview = async() => {
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    const avgRating=await updatedReviews.reduce((acc,curr)=>{
      return (acc+curr.rating)
    },0)/updatedReviews.length
    MoviesApi.updateReviews(props.id, { ...props.movie, Rating:avgRating, reviews: updatedReviews });
    dispatch(movieActions.updateReviews({ ...props.movie, Rating:avgRating, reviews: updatedReviews }))
    setNewReview({ ...newReview,rating:0, review: ""})
    toast.info(
      "review added..",{
        position:'top-center',
        autoClose:'1000',
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        progress:undefined,
        theme:"light"
      }
    )
  };
 
const handleDeleteReview=async(e,id)=>{
  if(window.confirm('are you sure..?')){
      const updatedReviews=reviews.filter(review=>review.id!==id)
      let avgRating= await updatedReviews.reduce((acc,curr)=>{
        return (acc+curr.rating)
      },0)/updatedReviews.length

      MoviesApi.updateReviews(props.id, { ...props.movie,Rating:avgRating, reviews: updatedReviews });
      dispatch(movieActions.updateReviews({ ...props.movie, Rating:avgRating, reviews: updatedReviews }))
      toast.danger(
        "review deleted..",{
          position:'top-center',
          autoClose:'1000',
          hideProgressBar:false,
          closeOnClick:true,
          pauseOnHover:true,
          draggable:true,
          progress:undefined,
          theme:"light"
        }
      )
      window.location.reload()
  }
}
  return (
    <Container className="mt-5 py-5" style={{backgroundColor:'transparent',border:'none'}}>
      <ReactStars 
        count={5}
        size={24}
        value={newReview.rating}
        isHalf={true}
        edit={true}
        color2={"#ffd700"}
        onChange={(e) => setNewReview({ ...newReview, rating: e })}
      />
      <div className="d-flex " >
      <Form.Control
        type="text"
        placeholder="write your review here..."
        value={newReview.review}
        required
        style={{ width: "20rem" }}
        onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
      />
      <Button
        type="submit"
        className="btn btn-light"
        disabled={!newReview.review}
        onClick={(e) => submitReview(e)}
      >
        <i className="bi bi-check-circle " />
      </Button>
      <Button
        type="reset"
        className="btn btn-light"
        onClick={(e) => setNewReview({ ...newReview, review: "",rating:0 })}
      >
        <i className="bi bi-x-circle " />
      </Button>
      </div>
      <br/>

      {reviews.map((review, index) => (
        <Card c key={index}  style={{ padding:'1%', borderRadius:'12px',borderColor:'Highlight',boxShadow:'10px 12px 18px -6px yellow',backgroundColor:'transparent'}}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4 className="text-info">
              {review.userName}
            </h4>
         { ((user?.FirstName==="Admin")||(user?._id===review.userId))&& <i className="bi bi-trash text-white " style={{cursor:'pointer'}} onClick={(e)=>handleDeleteReview(e,review.id)} />}
          </div>
          <ReactStars
            count={5}
            size={20}
            value={review.rating}
            isHalf={true}
            edit={false}
            color2={"#ffd700"}
          />
          <div className="text-white" style={{ display: "flex", justifyContent: "space-between" }}>
          {review.review}
           <div className="text-primary">{review.reviewDate}</div>
           </div>
        </Card>
       
      ))}

    </Container>
  );
};

export default ReviewPage;
