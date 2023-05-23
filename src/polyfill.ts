import { Buffer } from 'buffer';

window.global = window;
global.Buffer = Buffer;
global.process = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    env: { DEBUG: undefined },
    version: '',
    nextTick: require('next-tick')
};
