// import React from "react";
// function importAll(r) {
//   let images = [];
//   r.keys().map((item, index) => {
//     images.push(r(item));
//   });
//   return images;
// }

// const images = importAll(
//   require.context("./images", false, /\.(png|jpe?g|bmp|svg)$/)
// );

// const Image = (props) => {
//   return (
//     <>
//       {images.map((image, id) => {
//         return (
//           <>
//             <h3>{image.default}</h3>
//             <img
//               className="lesson-image"
//               src={image.default}
//               alt={image.default}
//               key={id}
//               style={{ width: "50%" }}
//               onClick={props.chooseImage}
//               name="image"
//             />
//           </>
//         );
//       })}
//     </>
//   );
// };

// export default Image;
