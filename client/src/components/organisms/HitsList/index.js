import { useEffect, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomCard from 'components/molecules/CustomCard';
import { getHits, logout } from 'redux/actions';
import { NavLink } from 'react-router-dom';
import CustomButton from 'components/atoms/CustomButton';
import CustomTitle from 'components/atoms/CustomTitle';
import 'components/organisms/HitsList/index.css';

export default function HitList() {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);

  useEffect(() => {
    dispatch(getHits(loggedUser.id));
  }, [dispatch]);

  const handleLogut = async (e) => {
    e.preventDefault();
    window.location.replace('/');
  };
  const hits = useSelector((state) => state.hits);

  return (
    <section>
      <CustomCard className="buttonscontainer">
        <CustomCard className="menuitems">
          {loggedUser.type !== 'hitman' ? (
            <NavLink to="/hits/create">
              <CustomButton className={'button__generic'} text={'Create Hit'} />
            </NavLink>
          ) : null}
          {loggedUser.type !== 'hitman' ? (
            <NavLink to="/hitmen">
              <CustomButton
                className={'button__generic'}
                text={'Hitmans List'}
              />
            </NavLink>
          ) : null}
        </CustomCard>
        <CustomCard className="logout">
          <CustomButton
            className={'button__generic'}
            text={'Logout'}
            handler={handleLogut}
          />
        </CustomCard>
      </CustomCard>
      <CustomCard className="hitlist">
        {hits.length > 0 ? (
          hits.map((hit) => {
            return (
              <NavLink
                className="linkto__hitlist"
                key={hit.id}
                to={`/hits/${hit.id}`}
              >
                <CustomCard className="customcard__hit">
                  {hit.description}
                </CustomCard>
              </NavLink>
            );
          })
        ) : (
          <CustomTitle className="title__generic" text={'No hits to show'} />
        )}
      </CustomCard>
    </section>
  );
}
