import React, { Component } from 'react'

const GlobalContext = React.createContext()

class GlobalProvider extends Component {
  // Context state
  state = {
    data: {},
  }

  // Method to update state
  setData = (data) => {
    this.setState((prevState) => ({ data }))
  }

  render() {
    const { children } = this.props
    const { data } = this.state
    const { setData } = this

    return (
      <GlobalContext.Provider
        value={{
          data,
          setData,
        }}
      >
        {children}
      </GlobalContext.Provider>
    )
  }
}

export default GlobalContext

export { GlobalProvider }