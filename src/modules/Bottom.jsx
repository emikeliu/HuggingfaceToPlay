import * as React from 'react';
import { Paper,BottomNavigation,BottomNavigationAction } from '@mui/material';
import { AccessibleForward, Chat, Favorite, Info, LocationOn } from '@mui/icons-material'


export default function Bottom(props) {
  const [value, setValue] = React.useState(0);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3} >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          props.onChange(event, newValue)
        }}
      >
        <BottomNavigationAction label="文本生成" icon={<Chat />} />
        <BottomNavigationAction label="目标识别" icon={<LocationOn />} />
        <BottomNavigationAction label="图像描述" icon={<AccessibleForward />} />
        <BottomNavigationAction label="关于我们" icon={<Info />} />
      </BottomNavigation>
    </Paper>
  );
}