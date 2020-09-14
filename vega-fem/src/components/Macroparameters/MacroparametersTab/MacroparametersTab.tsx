import React from 'react';

import { MacroparameterSetContainer } from '../../../containers/Macroparameters/MacroparameterSetContainer';
import { MacroparameterSetListContainer } from '../../../containers/Macroparameters/MacroparameterSetListContainer';

import { cnMacroparametersTab } from './cn-macroparameter-tab';

import './MacroparametersTab.css';

export const MacroparametersTab = (): React.ReactElement => (
  <div className={cnMacroparametersTab()}>
    <MacroparameterSetListContainer />
    <MacroparameterSetContainer />
  </div>
);
