import EventBuilder from '@classes/Event';
import createDebug from 'debug';

const log = createDebug('Events : Client : Ready');
log.enabled = true;

export default new EventBuilder('ready', true).setCallback(async client => {
	log(`Logged in as ${client.user!.tag}`);
});
