import CustomButton from 'components/atoms/CustomButton';
import CustomInput from 'components/atoms/CustomInput';
import { CustomSelect } from 'components/atoms/CustomSelect';
import CustomCard from 'components/molecules/CustomCard';
import { React } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginUser } from 'redux/actions';
import { Link, NavLink } from 'react-router-dom';
import CustomTitle from 'components/atoms/CustomTitle';
import 'components/organisms/Login/index.css';
import CustomModal from 'components/molecules/CustomModal';
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.loggedUser);

  const [inputs, setInputs] = useState({
    email: '',
    username: '',
    password: '',
    type: '',
  });
  const [missingFieldsModal, setMissingFieldsModal] = useState(false);
  const [incorrectInfoModal, setIncorrectInfoModal] = useState(false);
  const handleInputChange = (e) => {
    e.preventDefault();
    setInputs((prev) => {
      const input = {
        ...prev,
        [e.target.name]: e.target.value,
      };
      return input;
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (inputs.email && inputs.password) {
        dispatch(loginUser(inputs))
          .then(() => {
            if (loggedUser.length !== 0) {
              navigate('/hits/');
            }
          })
          .catch((error) => {
            setIncorrectInfoModal(true);
            setTimeout(() => {
              setIncorrectInfoModal(false);
            }, 1000);
            throw new Error(error);
          });
      } else {
        setMissingFieldsModal(true);
        setTimeout(() => {
          setMissingFieldsModal(false);
        }, 1000);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => { }, [loggedUser]);

  return (
    <CustomCard className="login">
      <CustomTitle className="title__generic" text="Login" />
      <CustomInput
        className="input__generic"
        label="E-mail"
        name="email"
        value={inputs.email}
        type="text"
        placeholder="Insert email"
        handler={handleInputChange}
      />
      <CustomInput
        className="input__generic"
        label="Password"
        name="password"
        value={inputs.password}
        type="password"
        placeholder="Insert password"
        handler={handleInputChange}
      />
      <NavLink className="linkto__generic" to="/register/">
        Don't have an account yet? Register!
      </NavLink>
      <CustomButton
        className="button__generic"
        text="Login"
        handler={handleSubmit}
      />
      <CustomModal
        modal={missingFieldsModal}
        setModal={setMissingFieldsModal}
        message={'Missing fields'}
        backTo={'/'}
      />
      <CustomModal
        modal={incorrectInfoModal}
        setModal={setIncorrectInfoModal}
        message={'Incorrect password or username'}
        backTo={'/'}
      />
    </CustomCard>
  );
}
