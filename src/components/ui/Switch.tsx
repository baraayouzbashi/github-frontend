import * as SwitchBase from "@radix-ui/react-switch";
import styled from "styled-components";
import React, { forwardRef } from "react";

const StyledSwitchRoot = styled(SwitchBase.Root)`
  width: 42px;
  height: 25px;
  background-color: #e4e4e7;
  border-radius: 9999px;
  position: relative;
  border: 0;
  &[data-state="checked"] {
    background-color: #1f883d;
  }
`;

const StyledSwitchThumb = styled(SwitchBase.Thumb)`
  display: block;
  width: 21px;
  height: 21px;
  background-color: white;
  border-radius: 9999px;
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;
  &[data-state="checked"] {
    transform: translateX(19px);
  }
`;

const Switch = forwardRef<
  React.ElementRef<typeof SwitchBase.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchBase.Root>
>(function MySwitch({ className, ...props }, ref) {
  return (
    <StyledSwitchRoot {...props} ref={ref} className={className}>
      <StyledSwitchThumb />
    </StyledSwitchRoot>
  );
});
Switch.displayName = SwitchBase.Root.displayName;

export default Switch;
