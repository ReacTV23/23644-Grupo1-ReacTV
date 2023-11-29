// Card.jsx
import SimpleImage from "../SimpleImage/SimpleImage";

const Card = ({ data, onClick }) => {
  return (
    <>
      <SimpleImage
        title={data.title}
        path={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
        onClick={() => {
          onClick();
        }}
      />
    </>
  );
};

export default Card;
