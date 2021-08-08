import React from 'react';
import './index.scss';

export const OnOffSwitcher = () => {
  return (
    <>
      <div className="on-off-switcher-container">
        <input type="checkbox" id="switch1" name="switch1" className="input__on-off" />
        <label htmlFor="switch1" className="label__on-off">
          <span className="marble"></span>
          <span className="on">on</span> <span className="off">off</span>
        </label>
      </div>
    </>
  );
};
