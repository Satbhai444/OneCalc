import React from 'react';
import { FlexWidget, TextWidget } from 'react-native-android-widget';

interface WidgetProps {
  displayText?: string;
  size?: 'small' | 'medium';
}

export function OneCalcWidget({ displayText = "0", size = 'medium' }: WidgetProps) {
  const isSmall = size === 'small';

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        flexDirection: 'column',
        backgroundColor: '#0A1F44',
        borderRadius: 16,
        padding: 12,
      }}
    >
      {/* Display */}
      <FlexWidget
        style={{
          flex: 1,
          backgroundColor: '#F8FAFC',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingHorizontal: 12,
          marginBottom: 8,
        }}
      >
        <TextWidget
          text={displayText}
          style={{ fontSize: isSmall ? 28 : 36, color: '#0A1F44' }}
        />
      </FlexWidget>

      {/* Rows - Only show minimal rows if small */}
      {!isSmall && (
        <FlexWidget style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
          <ActionBtn text="C" color="#EF4444" action="C" />
          <ActionBtn text="Del" color="#4A90D9" action="DEL" />
          <ActionBtn text="%" color="#4A90D9" action="%" />
          <ActionBtn text="÷" color="#4A90D9" action="/" />
        </FlexWidget>
      )}

      <FlexWidget style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
        <ActionBtn text="7" color="#F8FAFC" action="7" />
        <ActionBtn text="8" color="#F8FAFC" action="8" />
        <ActionBtn text="9" color="#F8FAFC" action="9" />
        <ActionBtn text="×" color="#4A90D9" action="*" />
      </FlexWidget>

      <FlexWidget style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
        <ActionBtn text="4" color="#F8FAFC" action="4" />
        <ActionBtn text="5" color="#F8FAFC" action="5" />
        <ActionBtn text="6" color="#F8FAFC" action="6" />
        <ActionBtn text="-" color="#4A90D9" action="-" />
      </FlexWidget>

      <FlexWidget style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
        <ActionBtn text="1" color="#F8FAFC" action="1" />
        <ActionBtn text="2" color="#F8FAFC" action="2" />
        <ActionBtn text="3" color="#F8FAFC" action="3" />
        <ActionBtn text="+" color="#4A90D9" action="+" />
      </FlexWidget>

      <FlexWidget style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <ActionBtn text="0" color="#F8FAFC" action="0" flex={2.1} />
        <ActionBtn text="." color="#F8FAFC" action="." />
        <ActionBtn text="=" color="#0A1F44" bg="#4A90D9" action="=" />
      </FlexWidget>
    </FlexWidget>
  );
}

function ActionBtn({ text, color, bg = '#1E293B', action, flex = 1 }: { text: string, color: string, bg?: string, action: string, flex?: number }) {
  return (
    <FlexWidget
      clickAction={action}
      style={{
        flex: flex,
        height: 45,
        borderRadius: 8,
        backgroundColor: bg as any,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
      }}
    >
      <TextWidget text={text} style={{ fontSize: 20, color: color as any }} />
    </FlexWidget>
  );
}
