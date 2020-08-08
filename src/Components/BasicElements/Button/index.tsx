import React, { FC } from 'react';
import { Fab } from '@material-ui/core';
import styled from 'styled-components';
import LoadingSpinner from '../LoadingSpinner';

const StyledFab = styled(Fab)`
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: normal;
  && .MuiFab-label {
    font-weight: 600;
    padding: 6px;
    font-size: 12px;
    line-height: 24px;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    color: #ffffff;
  }
`;

const Button: FC<{
  disabled?: boolean;
  variant?: 'round' | 'extended' | undefined;
  color?: 'default' | 'inherit' | 'primary' | 'secondary' | undefined;
  size?: 'small' | 'medium' | 'large' | undefined;
  loading?: boolean;
  autoFocus?: boolean;
  onClick?: () => void;
  className?: string;
}> = ({
  variant = 'extended',
  color = 'primary',
  size = 'small',
  className,
  autoFocus,
  disabled = false,
  onClick = () => {},
  children,
  loading = false,
}) => {
  return (
    <StyledFab
      className={className}
      variant={variant}
      color={color}
      size={size}
      autoFocus={autoFocus}
      onClick={onClick}
      disabled={disabled || loading}
    >
      <LoadingSpinner visible={loading} size={32} />
      {children}
    </StyledFab>
  );
};

export default Button;
