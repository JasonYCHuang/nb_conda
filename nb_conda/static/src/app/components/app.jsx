import React from 'react';
import { Panel } from 'react-bootstrap';
import Header from './header';
import Content from './content';

const App = () => {
  const renderHeader = <Header />;
  const renderContent = <Content />;

  return (
    <Panel header={renderHeader}>
      {renderContent}
    </Panel>
  );
};

export default App;
