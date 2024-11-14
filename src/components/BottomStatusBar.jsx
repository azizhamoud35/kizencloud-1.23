import React from 'react';
import { Layers, Globe, MessageSquare } from 'lucide-react';
import { Tooltip } from './common/Tooltip';

const BottomStatusBar = () => (
  <div className="bg-gray-200 p-2 flex justify-between items-center">
    <div>Notes</div>
    <div className="flex items-center space-x-4">
      <span>SMS Balance query</span>
      <span>9:59:11 AM</span>
      <span>admin</span>
      <span>01/10/2024</span>
      <Tooltip text="Layers"><Layers size={20} /></Tooltip>
      <Tooltip text="Globe"><Globe size={20} /></Tooltip>
      <Tooltip text="Message Square"><MessageSquare size={20} /></Tooltip>
    </div>
  </div>
);

export default BottomStatusBar;