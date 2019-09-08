import React from 'react';
import { lifecycle, compose } from 'recompose';
import { connect } from 'react-redux';
import { connectSocket } from '../redux/actions';

const App = () => {
  return <div className="App">Game of life</div>;
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
