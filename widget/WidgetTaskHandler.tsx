import React from 'react';
import { requestWidgetUpdate } from 'react-native-android-widget';
import { OneCalcWidget } from './OneCalcWidget';

let currentInput = "0";

export async function widgetTaskHandler(props: any) {
  const { widgetAction, clickAction } = props;

  if (clickAction === 'C') {
    currentInput = "0";
  } else if (clickAction === '=') {
    try {
      // Basic secure evaluation wrapper
      const calcResult = new Function('return ' + currentInput)();
      if (!isFinite(calcResult)) {
        currentInput = "Error";
      } else {
        currentInput = String(calcResult);
      }
    } catch (e) {
      currentInput = "Error";
    }
  } else if (clickAction === 'DEL') {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
  } else if (clickAction) {
    if (currentInput === "0" || currentInput === "Error") {
      currentInput = clickAction;
    } else {
      currentInput += clickAction;
    }
  }

  requestWidgetUpdate({
    widgetName: 'OneCalcWidget',
    renderWidget: () => <OneCalcWidget displayText={currentInput} />,
  });
}
