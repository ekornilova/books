import React, { FC, forwardRef, Ref } from 'react';
import styled from 'styled-components';
import Scrollbar from 'react-scrollbars-custom';

const StyledThumbY = styled.div`
  background: #c4c4c4 !important;
  border-radius: 100px !important;
`;

const StyledTrackY = styled.div`
  top: 0px !important;
  background: none !important;
  height: 100% !important;
  width: 6px !important;
  z-index: 2;
`;
const StyledTrackX = styled.div`
  left: 0 !important;
  background: transparent !important;
  height: 6px !important;
  width: 100% !important;
`;
const StyledThumbX = styled.div`
  background: #c4c4c4 !important;
  border-radius: 100px !important;
`;
export const ScrollbarWithCondition: React.FC<{ showScrollBar: boolean }> = ({
  children,
  showScrollBar,
}) => {
  return showScrollBar ? <StyledScrollbar>{children}</StyledScrollbar> : <>{children}</>;
};
const StyledScrollbar: FC<{ scrollTop?: number; ref?: Ref<HTMLDivElement> }> = forwardRef(
  ({ children, scrollTop, ...rootProps }, ref) => (
    <Scrollbar
      scrollTop={scrollTop}
      ref={ref}
      trackYProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return (
            <StyledTrackY
              {...restProps}
              ref={elementRef}
              className="ScrollbarsCustom-Track ScrollbarsCustom-TrackY"
            />
          );
        },
      }}
      thumbYProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return (
            <StyledThumbY
              {...restProps}
              ref={elementRef}
              className="ScrollbarsCustom-Thumb ScrollbarsCustom-ThumbY"
            />
          );
        },
      }}
      trackXProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return (
            <StyledTrackX
              {...restProps}
              ref={elementRef}
              className="ScrollbarsCustom-Track ScrollbarsCustom-TrackX"
            />
          );
        },
      }}
      thumbXProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return (
            <StyledThumbX
              {...restProps}
              ref={elementRef}
              className="ScrollbarsCustom-Thumb ScrollbarsCustom-ThumbX"
            />
          );
        },
      }}
      wrapperProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return <div {...restProps} ref={elementRef} className="ScrollbarsCustom-Wrapper" />;
        },
      }}
      {...rootProps}
    >
      {children}
    </Scrollbar>
  ),
);

export default StyledScrollbar;
