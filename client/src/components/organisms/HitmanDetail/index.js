import CustomButton from 'components/atoms/CustomButton';
import { CustomSelect } from 'components/atoms/CustomSelect';
import { ElementTextDetail } from 'components/atoms/ElementTextDetail';
import CustomCard from 'components/molecules/CustomCard';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
  getAssociatedHitman,
  getHitmanById,
  markAsNonActiveHitman,
} from 'redux/actions';
import { NavLink } from 'react-router-dom';
import 'components/organisms/HitmanDetail/index.css';
import CustomModal from 'components/molecules/CustomModal';

export default function HitmanDetail({ id }) {
  const dispatch = useDispatch();
  const params = useParams();
  const hitman = useSelector((state) => state.hitmanDetail);
  const associatedHitmans = useSelector((state) => state.associatedHitmans);
  const [modal, setModal] = useState(false);
  const [inputs, setInputs] = useState({
    newStatus: true,
  });

  useEffect(() => {
    dispatch(getHitmanById(params.id));
    dispatch(getAssociatedHitman(params.id));
  }, []);

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
      inputs.newStatus = inputs.isActive === 'Active' ? true : false;
      e.preventDefault();
      dispatch(
        markAsNonActiveHitman({
          newStatus: inputs.newStatus,
          hitmanId: hitman.id,
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
    <>
      <NavLink to="/hitmen" className={'navlink'}>
        <CustomButton
          className={'button__generic'}
          text={'Back to hitmans'}
        ></CustomButton>
      </NavLink>
      <div className={'hitmandetail'}>
        <section className={'hitmandetail_info'}>
          <CustomCard className={'customcard'}>
            <ElementTextDetail
              className={'hitmandetail_elementtextdetail'}
              text={hitman.username}
              label={'Name'}
            />
            <ElementTextDetail
              className={'hitmandetail_elementtextdetail'}
              text={hitman.email}
              label={'Email'}
            />
          </CustomCard>
          <CustomSelect
            className={'hitmandetail__select'}
            defaultOptionText={'Active'}
            options={['Inactive']}
            name={'newStatus'}
            value={inputs.newStatus}
            handler={handleInputChange}
          />
        </section>
        <section className="hitmandetail_associatedhitmans">
          {associatedHitmans.length > 0 ? (
            <CustomCard className={'hitmandetail__card'}>
              <label className={'hitmandetail__label'}>
                Associated Hitmans
              </label>
              <ol className={'hitmandetail__ol'}>
                {associatedHitmans.map((hitman) => {
                  return (
                    <li className={'hitmandetail__li'}>{hitman.username}</li>
                  );
                })}
              </ol>
            </CustomCard>
          ) : null}
        </section>
        <CustomButton
          className={'button__generic'}
          text={'Save Changes'}
          handler={handleSubmit}
        />
      </div>
      <CustomModal
        modal={modal}
        setModal={setModal}
        message={'hit updated successfuly!'}
      />
    </>
  );
}
