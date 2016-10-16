import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
    






export default class AdderItem extends Component {

  constructor(props,children) {
    super(props);
  }


  render() {
    return (
      <div>
        <div>지구 종말까지</div>
        <div>2016-10-10</div>
        <div>
          <IconButton ><i className="material-icons">create</i></IconButton>
        </div>
      </div>
    )
  }
}
