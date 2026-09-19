'use client';

import React from 'react';
import { SpatialOsSandbox } from './SpatialOsSandbox';
import { Three3dSandbox } from './Three3dSandbox';
import { TradingTerminalSandbox } from './TradingTerminalSandbox';
import { FluidDynamicsSandbox } from './FluidDynamicsSandbox';

interface Props {
  type: 'spatial-os' | 'threejs-3d' | 'candlestick-terminal' | 'fluid-canvas';
  isExpanded?: boolean;
}

export const SandboxDispatcher: React.FC<Props> = ({ type, isExpanded = false }) => {
  switch (type) {
    case 'spatial-os':
      return <SpatialOsSandbox isExpanded={isExpanded} />;
    case 'threejs-3d':
      return <Three3dSandbox isExpanded={isExpanded} />;
    case 'candlestick-terminal':
      return <TradingTerminalSandbox isExpanded={isExpanded} />;
    case 'fluid-canvas':
      return <FluidDynamicsSandbox isExpanded={isExpanded} />;
    default:
      return null;
  }
};
