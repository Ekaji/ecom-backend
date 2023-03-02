import logger from 'pino'
import dayjs from 'dayjs'
import pretty from 'pino-pretty'
// import { timeStamp } from 'console'



const log = logger({
    
    base: {
        pid: false,
    },
    timestamp: () => `,"time":${dayjs().format()}`,
})

export default log;