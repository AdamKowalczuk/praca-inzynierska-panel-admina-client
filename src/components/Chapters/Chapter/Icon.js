import React from "react";
function importAll(r) {
  let images = [];
  r.keys().map((item, index) => {
    images.push(r(item));
  });
  return images;
}

const images = importAll(
  require.context("./icons", false, /\.(png|jpe?g|svg)$/)
);

const Icon = (props) => {
  return (
    <>
      {images.map((image, id) => {
        return (
          <img
            src={image.default}
            alt={image.default}
            key={id}
            style={{ width: "50%" }}
            onClick={props.chooseIcon}
            id="icon"
            name="icon"
          />
        );
      })}
    </>
  );
};

export default Icon;
