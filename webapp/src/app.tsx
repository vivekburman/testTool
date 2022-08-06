import React from "react";
import AppPage from "./pages/AppPage";
import LandingPage from "./pages/LandingPage";

/**
 * Task: 
 * 1. Load the main app
 * 2. Show Landing screen (for future use)
 * 3. Load the App Page
 */

interface IProps {
}

interface IState {
  showLandingPage?: boolean;
}

export class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showLandingPage: true
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showLandingPage: false
      });
    }, 100);  
  }
  render(): React.ReactNode {
    const { showLandingPage } = this.state;
    return (
      <div className="tta-full-width tta-full-height">
        {
          showLandingPage ? <LandingPage /> : <AppPage />
        }
      </div>
    )
  }
}