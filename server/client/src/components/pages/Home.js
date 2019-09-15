import React from 'react';
import { lifecycle, compose } from 'recompose';
import { connect } from 'react-redux';
import { connectSocket } from 'redux/actions';
import styled from 'styled-components';
import Header from 'components/modules/header';
import ControlPanel from 'components/modules/controlPanel';
import Grid from 'components/modules/grid';

const AppContainer = styled.div`
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  color: white;
  padding: 30px 0px;
`;

const App = () => {
  return (
    <AppContainer>
      <Header />
      <ControlPanel />
      <Grid />
    </AppContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  connectSocket: () => {
    dispatch(connectSocket());
  },
});

const enhance = compose(
  connect(
    null,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      const { connectSocket } = this.props;
      connectSocket();
    },
  })
);

export default enhance(App);
