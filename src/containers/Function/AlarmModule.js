import {dateTimeToFormatted} from './dateTimeModule';
let AlarmActions;

export const setAlarmActions =(alarmActions)=>{
    AlarmActions = alarmActions;
}
export const setAlarmTime = async(alarmList)=>{
    await Promise.all(alarmList.map(
        async(alarm,index) =>{
            let time = alarm.get('timestamp');
            let dateString = dateTimeToFormatted(time);
            await AlarmActions.setAlarmTime({dateString:dateString,index : index});
        }
    )
);
}