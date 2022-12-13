import CustomButton from 'components/atoms/CustomButton';
import CustomInput from 'components/atoms/CustomInput';
import { CustomSelect } from 'components/atoms/CustomSelect';
import CustomTitle from 'components/atoms/CustomTitle';
import CustomCard from 'components/molecules/CustomCard';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { registerUser } from 'redux/actions';
import { userRoles } from 'utils';
import 'components/organisms/Register/index.css';
import { NavLink } from 'react-router-dom';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: '',
    username: '',
    password: '',
    type: '',
  });

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
      dispatch(registerUser(inputs));

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <CustomCard className={'register'}>
      <CustomTitle className="title__generic" text="Register" />
      <NavLink to="/">
        <CustomButton text="Back to Login" className="button__generic" />
      </NavLink>
      <CustomInput
        className={'input__generic'}
        label={'Username'}
        name={'username'}
        value={inputs.username}
        type={'text'}
        placeholder={'Username'}
        handler={handleInputChange}
      />
      <CustomInput
        className={'input__generic'}
        label={'E-mail'}
        name={'email'}
        value={inputs.email}
        type={'text'}
        placeholder={'Email'}
        handler={handleInputChange}
      />
      <CustomInput
        className={'input__generic'}
        label={'Password'}
        name={'password'}
        value={inputs.password}
        type={'password'}
        placeholder={'Password'}
        handler={handleInputChange}
      />
      <CustomSelect
        className={'select__generic'}
        name={'type'}
        disabled={false}
        value={inputs.type}
        handler={handleInputChange}
        options={userRoles}
        label={'Role'}
      />
      <CustomButton
        className={'button__generic'}
        text={'Register'}
        handler={handleSubmit}
      />
    </CustomCard>
  );
}
