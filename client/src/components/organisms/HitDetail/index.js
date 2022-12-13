import CustomInput from 'components/atoms/CustomInput';
import { CustomSelect } from 'components/atoms/CustomSelect';
import CustomCard from 'components/molecules/CustomCard';
import React, { useEffect, useState } from 'react';
import { CustomParagraph } from 'components/atoms/CustomParagraph';
import { useDispatch, useSelector } from 'react-redux';
import { getHitById, getHitmansAndManagers, updateHit } from 'redux/actions';
import { useParams } from 'react-router';
import { hitStatus } from 'utils';
import CustomButton from 'components/atoms/CustomButton';
import { checkIsDisabledForUser } from './hit-detail.utils';
import { NavLink } from 'react-router-dom';
import 'components/organisms/HitDetail/index.css';
import CustomModal from 'components/molecules/CustomModal';

export default function HitDetail() {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getHitById(params.id));
    dispatch(getHitmansAndManagers(''));
  }, []);

  const hit = useSelector((state) => state.hitDetail);
  const loggedUser = useSelector((state) => state.loggedUser);
  const possiblesUsersToAssingHit = useSelector(
    (state) => state.hitmansAndManagers,
  );
  const filteredHitsToAssing = possiblesUsersToAssingHit.map((user) => {
    if (user.isActive) {
      return user.username + '-' + user.id.toString();
    }
  });
  const isDisabled = checkIsDisabledForUser(loggedUser);

  const [inputs, setInputs] = useState({
    description: hit.description,
    targetName: hit.target_name,
    status: hit.status,
    hitCreator: hit.hit_creator,
    assignee: hit.assignee,
    hitId: hit.id,
  });
  const [modal, setModal] = useState(false);

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
      let obj = {};
      obj.assignee = inputs.assignee ?? hit.assignee;
      obj.status = inputs.status ?? hit.status;

      dispatch(
        updateHit({
          description: hit.description,
          targetName: hit.target_name,
          status: obj.status,
          hitCreator: hit.hit_creator,
          assignee: obj.assignee,
          hitId: hit.id,
        }),
      );
      setModal(true);
      setTimeout(() => {
        setModal(false);
      }, 1000);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <CustomCard className="hitdetail">
      <NavLink to="/hits">
        <CustomButton
          className={'button__generic'}
          text={'Back to hits'}
        ></CustomButton>
      </NavLink>
      <CustomParagraph text={hit.description}></CustomParagraph>
      <CustomCard className="hitdetail_customcard">
        <CustomInput
          className={'input__generic'}
          label={'Target Name'}
          name={'targetName'}
          value={inputs.targetName}
          type={'text'}
          placeholder={'Target Name'}
          disabled={isDisabled.targetName}
          handler={handleInputChange}
        />
        <CustomInput
          className={'input__generic'}
          label={'Hit Creator'}
          name={'hitCreator'}
          value={inputs.hitCreator}
          type={'text'}
          placeholder={'Hit Creator'}
          disabled={isDisabled.hitCreator}
          handler={handleInputChange}
        />

        <CustomSelect
          className={'hitdetail__select'}
          label={'Status'}
          name={'status'}
          value={inputs.status}
          disabled={isDisabled.status}
          handler={handleInputChange}
          options={hitStatus}
          defaultOptionText={hit.status}
        />
        <CustomSelect
          className={'hitdetail__select'}
          label={'Change Assignee'}
          name={'assignee'}
          value={inputs.assignee}
          disabled={isDisabled.assignee}
          handler={handleInputChange}
          options={filteredHitsToAssing}
          defaultOptionText={hit.assignee}
        />
        <CustomButton
          className={'button__generic'}
          text={'Save Changes'}
          handler={handleSubmit}
        />
      </CustomCard>
      <CustomModal
        modal={modal}
        setModal={setModal}
        message={'hit updated successfuly!'}
        backTo={`/hits/${params.id}`}
      />
    </CustomCard>
  );
}
