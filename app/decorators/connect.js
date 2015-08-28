import React from 'react';

const connect = (Component, store) => {
  return class Connect extends React.Component {
    constructor(props) {
      super(props);

      this.storeChanged = this.storeChange.bind(this);
      this.state = store.getState();

      store.listen(this.storeChanged);
    }

    componentWillUnMount() {
      store.unlisten(this.storeChanged);
    }

    storeChange() {
      this.setState(store.getState());
    }

    render() {
      return <Component {...this.props} {...this.state} />
    }
  };
}

export default (store) => {
  return (target) => connect(target, store);
}
