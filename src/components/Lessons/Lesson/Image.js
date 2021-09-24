import React from "react";
function importAll(r) {
  let images = [];
  r.keys().map((item, index) => {
    images.push(r(item));
    // images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("./images", false, /\.(png|jpe?g|svg)$/)
);

const Image = (props) => {
  return (
    <>
      {images.map((image, id) => {
        return (
          <img
            className="lesson-image"
            src={image.default}
            alt={image.default}
            key={id}
            style={{ width: "50%" }}
            onClick={props.chooseImage}
            name="image"
          />
        );
      })}
    </>
  );
};

export default Image;
