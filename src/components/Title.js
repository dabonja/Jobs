import React from 'react';

const Title = ({title,title2}) => {
    return (
        <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">{title}</h1>
          <p className="lead">{title2}</p>
        </div>
      </div>
    )
}
export default Title