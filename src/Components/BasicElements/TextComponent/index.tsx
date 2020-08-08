import React, { FC } from 'react';
import { Typography } from '@material-ui/core';

const TextComponent: FC<{
  text: string;
  className?: string;
  color?:
    | 'inherit'
    | 'initial'
    | 'primary'
    | 'secondary'
    | 'textPrimary'
    | 'textSecondary'
    | 'error'
    | undefined;
}> = ({ text, className, color }) => {
  return (
    <Typography className={className} color={color}>
      {text}
    </Typography>
  );
};
export default TextComponent;
