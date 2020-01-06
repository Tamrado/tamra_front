import React from 'react';
import AlarmBox from './AlarmBox';
import AlarmMenuBox from './AlarmMenuBox';

const AlarmList = ({alarms,deleteclick,follow,result,alarm,visible,alarmvisible}) => {
    const alarmList = alarms.map(
        (alarm) => (
            alarm && <AlarmBox key = {alarm.get('link')+alarm.get('sender').id + alarm.get('message')}
             alarm = {alarm} 
              />
        )
    )
    return(
        <AlarmMenuBox alarmvisible = {alarmvisible} visible = {visible}>
            {alarmList}
            </AlarmMenuBox>
    );
}
export default AlarmList;