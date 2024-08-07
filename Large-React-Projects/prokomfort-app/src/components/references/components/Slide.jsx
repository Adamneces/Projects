import classes from "../styles/index.module.css";

export default function Slide({review}) {

  return (
    <div className={classes.container_slide}>
      <figure>
        <img src={review.img} />
        <figcaption>
          <p>{review.jobDescrip}</p>
        </figcaption>
      </figure>
      <aside>
        <p id="review">
        {review.review}
        </p>
        <p id="clientName">
            {review.clientName}
        </p>
      </aside>
    </div>
  );
}
