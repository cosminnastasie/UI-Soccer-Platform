import React from 'react';

const StoredCodeContext = React.createContext(null);

class StoredCodeProvider extends React.Component {
  render() {
    const storedCode = localStorage.getItem('key-write');

    return (
      <StoredCodeContext.Provider value={storedCode}>
        {this.props.children}
      </StoredCodeContext.Provider>
    );
  }
}

export { StoredCodeContext, StoredCodeProvider };
