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
  gutterBottom?: boolean;
}> = ({ text, className, color, ...rest }) => {
  return (
    <Typography className={className} color={color} {...rest}>
      {text}
    </Typography>
  );
};
export default TextComponent;
