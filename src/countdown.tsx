import { Paper } from '@material-ui/core';
import Countdown from 'react-countdown';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      padding: theme.spacing(0),
      '& > *': {
        //  margin: theme.spacing(0.5),
        marginRight: 10,
        width: theme.spacing(8),
        height: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#384457',
        color: 'white',
        borderRadius: 5,
        outline: "inset",
        fontSize: 14,
      },
    },
    done: {
      display: 'flex',
      margin: theme.spacing(1),
      marginRight: 10,
      padding: theme.spacing(1),
      flexDirection: 'column',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#384457',
      color: 'white',
      borderRadius: 5,
      fontWeight: 'bold',
      fontSize: 18,
    },
    item: {
      fontWeight: 'bold',
      fontSize: 25,
      color: 'yellow'
    }
  }),
);


interface PhaseCountdownProps {
  date: Date | undefined;
  style?: React.CSSProperties;
  status?: string;
  onComplete?: () => void;
  start?: Date;
  end?: Date;
}

interface CountdownRender {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

export const PhaseCountdown: React.FC<PhaseCountdownProps> = ({
  date,
  status,
  style,
  start,
  end,
  onComplete,
}) => {
  const classes = useStyles();

  const [isFixed, setIsFixed] = useState(start && end && date ? start.getTime() - Date.now() < 0 : false);

  const renderCountdown = ({ days, hours, minutes, seconds, completed }: CountdownRender) => {
    hours += days * 24
    if (completed) {
      return status ? <span className={classes.done}  >{status}</span> : null;
    } else {
      return (
        <div className={classes.root} style={style} >
          {isFixed && <Paper elevation={0}>
            <span className={classes.item}>
              +
            </span>
          </Paper>}
          <Paper elevation={0}>
            <span className={classes.item}>
              {hours < 10 ? `0${hours}` : hours}
            </span>
            <span>hrs</span>
          </Paper>
          <Paper elevation={0}>
            <span className={classes.item}>
              {minutes < 10 ? `0${minutes}` : minutes}
            </span>
            <span>mins</span>
          </Paper>
          <Paper elevation={0}>
            <span className={classes.item}>
              {seconds < 10 ? `0${seconds}` : seconds}
            </span>
            <span>secs</span>
          </Paper>
        </div>
      )
    }
  }

  if (date && start && end) {
    if (isFixed) {
      <Countdown
        date={start}
        now={() => end.getTime()}
        onComplete={() => setIsFixed(false)}
        renderer={renderCountdown}
      />
    }
  }

  if (date) {
    return (
      <Countdown
        date={date}
        onComplete={onComplete}
        renderer={renderCountdown}
      />
    )
  } else {
    return null
  }
}
