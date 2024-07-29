// import React from "react";
// import "../styles/Modal.css";

// const Modal = ({ title, content, onClose }) => (
//   <div className="modal-overlay" onClick={onClose}>
//     <div className="modal-content" onClick={e => e.stopPropagation()}>
//       <span className="close" onClick={onClose}>
//         &times;
//       </span>
//       <h2>{title}</h2>
//       <div
//         className="modal-body"
//         dangerouslySetInnerHTML={{ __html: content }}
//       ></div>
//     </div>
//   </div>
// );

// export default Modal;

import React from "react";
import "../styles/Modal.css";

const Modal = ({ title, content, imageUrl, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <span className="close" onClick={onClose}>
        &times;
      </span>
      {imageUrl && <img src={imageUrl} alt="modal" className="modal-image" />}
      <h2>{title}</h2>
      <div className="modal-body">{content}</div>
    </div>
  </div>
);

export default Modal;
