import React from 'react';
import CodeBlock from '@theme-original/CodeBlock';

import classnames from 'classnames';

const Wrapper = ({isWithinTab, learnMoreLink, withinMultiStep, ...props}) => {
  if (!withinMultiStep && isWithinTab) {
    return <CodeBlock {...props} />
  }
  
  return (
    <div className={classnames("snippet-container", {
      'is-within-multi-step': withinMultiStep,
    })}>
      <div className="snippet-header">
        {learnMoreLink &&
          <a className="learn-more" href={learnMoreLink}>
            Learn More
          </a>
        }
      </div>
      <CodeBlock {...props} />
    </div>
  );
};

export default Wrapper;
