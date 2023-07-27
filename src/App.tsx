import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import MapContainer from '../src/components/map/MapContainer';
import Header from './components/Header';
import Navigation from './components/Navigation';
import PostPage from './components/posts/PostPage';
import PostForm from './components/posts/PostForm';
import ReviewList from './components/review/ReviewList';
import ReviewWrite from './components/review/ReviewWrite';
import ReviewDetail from './components/review/ReviewDetail';
import Login from './components/login/Login';
import Register from './components/login/Register';
import RegisterPet from './components/login/RegisterPet';
import PostDetail from './components/detail/PostDetail';

const App = () => {
  return (
    <AppContainer>
      <Header />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/register/pet" element={<RegisterPet />}></Route>
          <Route
            path="/review/location/:location_id"
            element={<ReviewList />}
          />
          <Route path="/review/:review_id" element={<ReviewDetail />} />
          <Route path="/review" element={<ReviewWrite />} />
          <Route path="/board" />
          <Route path="/chat" />
          <Route path="/my" />
          <Route path="/posts/form" element={<PostForm />} />
          <Route path="/posts" element={<PostPage />} />
          <Route path="/post/:post_id" element={<PostDetail />} />
          <Route path="/" element={<MapContainer />}></Route>
        </Routes>
        <Navigation />
      </Router>
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  max-width: 425px;
  overflow: hidden;
  background-color: #fff;
`;
