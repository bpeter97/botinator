const googleIt = require('google-it');

module.exports = {
	name: 'google',
	description: 'Google!',
	execute(message, args) {

    // convert args into a query
    let query = args.toString().replace(/,/g, ' ');
    let queryLinkText = args.toString().replace(/,/g, '+');

    googleIt({'query' : query}).then(res => {

      message.channel.send({embed: {
        color: 3447003,
        thumbnail: {
          url: "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
        },
        title: query,
        url: `http://google.com/search?q=${queryLinkText}`,
        description: `These are the top 5 results for the search: "${query}"`,
        fields: res.slice(0,5).map(result => {
          return {
            name: result.title,
            value: result.snippet + `\n` + result.link
          }
        }),
        timestamp: new Date()
      }
    }).catch(e => {
      console.error(e);
      message.channel.send("There was an error completing your search.");
    });
  });
	}
};