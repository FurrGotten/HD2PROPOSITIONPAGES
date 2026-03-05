import React, { useState, type CSSProperties } from 'react';
import { Sketch, type ColorResult } from '@uiw/react-color';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const SmallColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const togglePicker = () => setIsOpen(!isOpen);
  const closePicker = () => setIsOpen(false);

  const styles: { [key: string]: CSSProperties } = {
    container: {
      position: 'relative',
      display: 'inline-block'
    },
    popover: {
      position: 'absolute',
      zIndex: 10,
      top: '40px',
      left: '0',
    },
    cover: {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    swatch: {
      width: '30px',
      height: '30px',
      backgroundColor: color,
      cursor: 'pointer',
      border: '2px solid #fff',
      boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
    },
  };

  return (
    <div style={styles.container}>
      <div
        style={styles.swatch}
        onClick={togglePicker}
      />

      {isOpen && (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={closePicker} />

          <Sketch
            color={color}
            onChange={(color: ColorResult) => {
              const { r, g, b, a } = color.rgba;
              onChange(`rgba(${r}, ${g}, ${b}, ${a})`);
            }}
          />
        </div>
      )}
    </div>
  );
};
