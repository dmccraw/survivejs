import AltContainer from 'alt/AltContainer';
import React from 'react';
import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

export default class App extends React.Component {

  // bulkLoad() {
  //   this.setState({bulkLoading: true});
  //   teamsnap.bulkLoad(1, function(err, items) {
  //     this.setState({bulkLoading: false});
  //     console.log(items);
  //   }.bind(this));
  // }

  // loadCollections() {
  //   var token = '7-js_frontend-dont_tell_the_cops';
  //   teamsnap.apiUrl = 'http://localhost:3000';

  //   var cachedCollections, cachedItems;
  //   try {
  //     cachedCollections = JSON.parse(sessionStorage.getItem('cachedCollections'));
  //     if (cachedCollections.sdkVersion !== teamsnap.version) {
  //       cachedCollections = null;
  //     }
  //   } catch (_error) {}

  //   try {
  //     cachedItems = JSON.parse(sessionStorage.getItem('cachedItems'));
  //   } catch (_error) {}

  //   if (token) {
  //     teamsnap.auth(token);
  //     this.setState({loaded: false, loading: true});
  //     teamsnap.loadCollections(typeof cachedCollections !== 'undefined' && cachedCollections !== null ? cachedCollections.collections : void 0).then(function() {

  //       var cachedItems;
  //       try {
  //         sessionStorage.setItem('cachedCollections', JSON.stringify({
  //           apiVersion: teamsnap.apiVersion,
  //           sdkVersion: teamsnap.version,
  //           collections: teamsnap.collections
  //         }));
  //       } catch (_error) {}
  //       if ((typeof cachedItems !== 'undefined' && cachedItems !== null ? cachedItems.apiVersion : void 0) !== teamsnap.apiVersion) {
  //         cachedItems = null;
  //       }
  //       window.cachedItems = teamsnap.enablePersistence(cachedItems !== null ? cachedItems.items : void 0);

  //       this.bulkLoad();

  //       this.setState({loading: false, loaded: true});
  //     }.bind(this));
  //   } else {
  //     this.bulkLoad();
  //     this.setState({loading: false, loaded: true});
  //   }

  // }

  render() {
    const notes = this.props.notes;

    return (
      <div>
        <button onClick={this.addItem}>+</button>
        <AltContainer
          stores={[LaneStore]}
          inject={ {
            items: () => LaneStore.getState().lanes || []
          } }
        >
          <Lanes />
        </AltContainer>
      </div>
    );
  }

  addItem() {
    LaneActions.create({name: 'New lane'});
  }
}
