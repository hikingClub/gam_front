import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/SignupTos.css";
import gyujangkak from "../assets/gyujangkak.png";
import Modal from "./Modal";
import SignupSns from "./SignupSns";
import { termsTitle, termsContent } from "../content/termsContent";
import { privacyTitle, privacyContent } from "../content/privacyContent";
import {
  notificationTitle,
  notificationContent,
} from "../content/notificationContent";

const SignupTos = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [individualChecked, setIndividualChecked] = useState({
    terms: false,
    privacy: false,
    notifications: false,
  });
  const [modalData, setModalData] = useState({
    title: "",
    content: null,
    imageUrl: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isSns, setIsSns] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsSns(params.get("type") === "sns");
  }, [location.search]);

  const handleAllChecked = () => {
    const newChecked = !allChecked;
    setAllChecked(newChecked);
    setIndividualChecked({
      terms: newChecked,
      privacy: newChecked,
      notifications: newChecked,
    });
  };

  const handleIndividualChecked = name => {
    const newChecked = !individualChecked[name];
    setIndividualChecked({
      ...individualChecked,
      [name]: newChecked,
    });

    if (!newChecked) {
      setAllChecked(false);
    } else {
      const allSelected = Object.values({
        ...individualChecked,
        [name]: newChecked,
      }).every(Boolean);
      setAllChecked(allSelected);
    }
  };

  const openModal = (title, content, imageUrl) => {
    setModalData({ title, content, imageUrl });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleNext = () => {
    if (!individualChecked.terms || !individualChecked.privacy) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      if (isSns) {
        // SNS 로그인일 경우 모달 창 열기
        openModal(<SignupSns />);
      } else {
        navigate("/signupform");
      }
    }
  };

  return (
    <div className="terms-main-container">
      <div className="terms-inner-container">
        <div className="terms-container-title">
          <h2>약관 동의</h2>
        </div>
        <div className="terms-container-content">
          <img src={gyujangkak} alt="gyujangkak" className="gyujangkak-image" />
          <p className="intro-text">
            환영합니다!
            <br />
            아래 약관에 동의하시면, 규장각의 유생이 되실 수 있습니다. 😁
          </p>
          <div className="chk_box_01">
            <label className="checkbox no-border">
              <input
                type="checkbox"
                id="all_consent"
                checked={allChecked}
                onChange={handleAllChecked}
              />
              <span className="label">전체 동의하기</span>
            </label>
          </div>
          <div className="chk_box_con">
            <label className="checkbox">
              <input
                type="checkbox"
                id="chk_conditions"
                checked={individualChecked.terms}
                onChange={() => handleIndividualChecked("terms")}
              />
              <span className="label">
                이용약관<span>(필수)</span>
              </span>
            </label>
            <a
              href="#"
              className="icon_more_01_agree"
              onClick={() => openModal(termsTitle, termsContent)}
            >
              자세히보기
            </a>
          </div>
          <div className="chk_box_con">
            <label className="checkbox">
              <input
                type="checkbox"
                id="chk_personaldata"
                checked={individualChecked.privacy}
                onChange={() => handleIndividualChecked("privacy")}
              />
              <span className="label">
                개인정보 처리방침<span>(필수)</span>
              </span>
            </label>
            <a
              href="#"
              className="icon_more_02_agree"
              onClick={() => openModal(privacyTitle, privacyContent)}
            >
              자세히보기
            </a>
          </div>
          <div className="chk_box_con">
            <label className="checkbox">
              <input
                type="checkbox"
                id="chk_collection"
                checked={individualChecked.notifications}
                onChange={() => handleIndividualChecked("notifications")}
              />
              <span className="label">
                알림 수신<span>(선택)</span>
              </span>
            </label>
            <a
              href="#"
              className="icon_more_03_agree"
              onClick={() => openModal(notificationTitle, notificationContent)}
            >
              자세히보기
            </a>
          </div>
          <div className="ok_btn_box">
            {showAlert && (
              <p className="alert-message">필수항목에 모두 동의해주세요</p>
            )}
            <button className="btn_id_sch" onClick={handleNext}>
              다음
            </button>
          </div>
          {showModal && (
            <Modal
              title={modalData.title}
              content={modalData.content}
              imageUrl={modalData.imageUrl}
              onClose={closeModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupTos;
