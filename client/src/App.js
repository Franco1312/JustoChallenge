import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'redux/store/store';
import './App.css';
import PrivateRoute from 'components/atoms/PrivateRoutes';
import Login from 'components/organisms/Login';
import Register from 'components/organisms/Register';
import HitList from 'components/organisms/HitsList';
import HitCreationForm from 'components/organisms/HitCreationForm';
import HitmanList from 'components/organisms/HitmanList';
import HitDetail from 'components/organisms/HitDetail';
import HitmanDetail from 'components/organisms/HitmanDetail';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/hits" element={<PrivateRoute />}>
              <Route exact path="/hits" element={<HitList />} />
            </Route>
            <Route exact path="/hits/create" element={<PrivateRoute />}>
              <Route exact path="/hits/create" element={<HitCreationForm />} />
            </Route>
            <Route exact path="/hitmen" element={<PrivateRoute />}>
              <Route exact path="/hitmen" element={<HitmanList />} />
            </Route>
            <Route exact path="/hitmen/:id" element={<PrivateRoute />}>
              <Route exact path="/hitmen/:id" element={<HitmanDetail />} />
            </Route>
            <Route exact path="/hits/:id" element={<PrivateRoute />}>
              <Route exact path="/hits/:id" element={<HitDetail />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
