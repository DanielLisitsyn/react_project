import styled from "./ModalLogout.module.scss";
import {Modal} from "components/Modal/Modal";
import { useDispatch } from "react-redux";
import { toggleModalLogout } from "redux/global/global-slice";
import { logOut } from "redux/session/auth-operation";

export default function ModalLogout() {
  const dispatch = useDispatch();
  const isCloseModal = () => {
    dispatch(toggleModalLogout());
  };

  const logOutUser = () => {
    dispatch(logOut());
  };
  return (
    <Modal closeModal={isCloseModal}>
      <div className={styled.logout}>
        <h1 className={styled.logout__title}> Are you sure you want to log out?</h1>
        <div className={styled.wrapper}>
          <button className={styled.wrapper__btn} type="button" onClick={logOutUser}>
            Yes
          </button>
          <button
            className={styled.wrapper__btn}
            type="button"
            onClick={isCloseModal}
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
}