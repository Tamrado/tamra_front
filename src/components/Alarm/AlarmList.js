import React from 'react';
import AlarmBox from './AlarmBox';
import AlarmMenuBox from './AlarmMenuBox';

const AlarmList = ({alarms,visible,alarmvisible,handleAllRead,handleAlarmInfoClick}) => {
    const alarmList = alarms.map(
        (alarm) => {
            return(alarm && <AlarmBox key = {alarm.get('postId')+alarm.getIn(['sender','id']) + alarm.get('message')}
             alarm = {alarm} handleAlarmInfoClick={handleAlarmInfoClick}
              />);
        }
    )
    return(
        <AlarmMenuBox handleAllRead={handleAllRead} alarmvisible = {alarmvisible} visible = {visible}>
            {alarmList}
            </AlarmMenuBox>
    );
}
export default AlarmList;