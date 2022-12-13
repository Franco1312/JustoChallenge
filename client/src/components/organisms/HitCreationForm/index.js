import CustomButton from 'components/atoms/CustomButton';
import CustomInput from 'components/atoms/CustomInput';
import { CustomSelect } from 'components/atoms/CustomSelect';
import CustomCard from 'components/molecules/CustomCard';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersToAssing } from './utils';
import { getHitmansAndManagers } from 'redux/actions';
import { createHit } from 'redux/actions';
import CustomTitle from 'components/atoms/CustomTitle';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'components/organisms/HitCreationForm/index.css';
import CustomModal from 'components/molecules/CustomModal';

export default function HitCreationForm() {
    const statuses = ['Active', 'Inactive'];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedUser = useSelector((state) => state.loggedUser);
    const possiblesUsersToAssingHit = useSelector(
        (state) => state.hitmansAndManagers,
    );
    const usersToAssing = getUsersToAssing(possiblesUsersToAssingHit, loggedUser);
    const isDisabled = usersToAssing.length === 0 ? true : false

    const [modalHitCreated, setModalHitCreated] = useState(false);
    const [modalMissingData, setModalMissingData] = useState(false);
    const [inputs, setInputs] = useState({
        description: '',
        targetName: '',
        hitCreator: loggedUser.username,
        assignee: '',
        isActive: true,
        userId: loggedUser.id,
        status: 'Assigneed',
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
            inputs.isActive = inputs.isActive === 'Active' ? true : false;
            dispatch(createHit(inputs))
                .then(() => {
                    setModalHitCreated(true);
                    setTimeout(() => {
                        setModalHitCreated(false);
                    }, 1000);
                })
                .catch((error) => {
                    setModalMissingData(true);
                    setTimeout(() => {
                        setModalMissingData(false);
                    }, 1000);
                    throw new Error(error);
                });
        } catch (error) {
            setModalMissingData(true);
            setTimeout(() => {
                setModalMissingData(false);
            }, 1000);
            throw new Error(error);
        }
    };

    useEffect(() => {
        dispatch(getHitmansAndManagers(''));
        if (loggedUser.type == 'hitman') {
            navigate('/hits');
        }
    }, []);
    return (
        <CustomCard className="hitcreationform">
            <NavLink to="/hits">
                <CustomButton
                    className={'button__generic'}
                    text={'Back to hits'}
                ></CustomButton>
            </NavLink>
            <CustomTitle
                className={'title__generic'}
                text={'Create a hit'}
            ></CustomTitle>
            <CustomInput
                className={'input__generic'}
                label={'Description'}
                name={'description'}
                value={inputs.description}
                type={'text'}
                placeholder={'Insert description'}
                handler={handleInputChange}
            />
            <CustomInput
                className={'input__generic'}
                label={'Target name'}
                name={'targetName'}
                value={inputs.targetName}
                type={'text'}
                placeholder={'Insert target name'}
                handler={handleInputChange}
            />
            <CustomSelect
                className={'select__generic'}
                label={'Assignee'}
                name={'assignee'}
                value={inputs.assignee}
                handler={handleInputChange}
                options={usersToAssing}
                defaultOptionText={'Select Assigne'}
                disabled={isDisabled}
            />
            <CustomSelect
                className={'select__generic'}
                label={'Status'}
                name={'isActive'}
                value={inputs.isActive}
                handler={handleInputChange}
                options={statuses}
                defaultOptionText={'Select Status'}
            />
            <CustomButton
                className={'button__generic'}
                handler={handleSubmit}
                text={'Create hit'}
            />
            <CustomModal
                modal={modalHitCreated}
                setModal={setModalHitCreated}
                message={'hit created successfuly!'}
            />
            <CustomModal
                modal={modalMissingData}
                setModal={setModalMissingData}
                message={'Missing data'}
            />
        </CustomCard>
    );
}
