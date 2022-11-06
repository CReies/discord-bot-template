import 'dotenv-safe/config';
import ExtendedClient from '@classes/Client';
import createDebug from 'debug';

const log = createDebug('bot');
log.enabled = true;

new ExtendedClient().start();
