import CustomTitle from 'components/atoms/CustomTitle';
import CustomCard from 'components/molecules/CustomCard';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { getHitmansAndManagers } from 'redux/actions';
import { checkWhatUsersShow } from 'utils';
import CustomButton from 'components/atoms/CustomButton';
import 'components/organisms/HitmanList/index.css';
export default function HitmanList() {
  useEffect(() => {
    dispatch(getHitmansAndManagers());
  }, []);

  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.loggedUser);
  const users = useSelector((state) => state.hitmansAndManagers);
  const usersToShow = checkWhatUsersShow(users, loggedUser);

  return (
    <CustomCard className="hitmanlist__buttoncontainer">
      <CustomCard>
        <NavLink to="/hits">
          <CustomButton
            className={'button__generic'}
            text={'Back to hits'}
          ></CustomButton>
        </NavLink>
      </CustomCard>
      <CustomCard className={'hitmanlist'}>
        {usersToShow ? (
          usersToShow?.map((user) => {
            return (
              <NavLink
                key={user.id}
                className={'linkto__hitmanlist'}
                to={`/hitmen/${user.id}`}
              >
                <CustomCard className="customcard__hitmanlist">
                  {user.username}
                </CustomCard>
              </NavLink>
            );
          })
        ) : (
          <CustomTitle
            className={'hitmanlist__title'}
            text={'No active hitmans'}
          />
        )}
      </CustomCard>
    </CustomCard>
  );
}
