const { get_value } = require('./gm_values');

async function produce_link (source_url, sources, description = '', tags = []) {
	const url = new URL('https://e621.net/uploads/new');
	url.searchParams.set('upload_url', source_url);
	if (sources.length) url.searchParams.set('sources', sources.join(','));
	if (description.length) url.searchParams.set('description', description);
	if (tags.length) url.searchParams.set('tags', tags.join(' '));
	const ratinglock = await get_value('on_site_ratinglock_enabled');
	if (ratinglock === true) url.searchParams.set('rating_locked', 'true');
	if (url.href.length > 8000) {
		if (description.length) return produce_link(source_url, sources, '', tags);
		else if (tags.length) return produce_link(source_url, sources, description, []);
	}
	return url.href;
}

async function upload_button (source_url, sources, description, tags = []) {
	const link = document.createElement('a');
	link.textContent = 'Upload to e621';
	link.id = 'iss_upload_link';
	link.href = produce_link(source_url, sources, description, tags);
	link.target = '_blank';

	return link;
}

module.exports = {
	upload_url: produce_link,
	upload_button: upload_button
};
