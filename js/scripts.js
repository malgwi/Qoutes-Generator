// import './quotes.js';

const quotes = [
	['The best preparation for tomorrow is doing your best today.', 'H. Jackson Brown, Jr.'],
	['The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.', 'Helen Keller'],
	['I can\'t change the direction of the wind, but I can adjust my sails to always reach my destination.', 'Jimmy Dean'],
	['Start by doing what\'s necessary; then do what\'s possible; and suddenly you are doing the impossible.', 'Francis of Assisi'],
	['Perfection is not attainable, but if we chase perfection we can catch excellence.', 'Vince Lombardi'],
	['We must let go of the life we have planned, so as to accept the one that is waiting for us.', 'Joseph Campbell'],
	['Try to be a rainbow in someone\'s cloud.', 'Maya Angelou'],
	['Nothing is impossible, the word itself says \'I\'m possible\'.', 'Audrey Hepburn'],
	['If opportunity doesn\'t knock, build a door.', 'Milton Berle'],
	['We know what we are, but know not what we may be.', 'William Shakespeare'],
	['Change your thoughts and you change the world.', 'Norman Vincent Peale'],
	['Believe you can and you\'re halfway there.', 'Theodore Roosevelt'],
	['Put your heart, mind, and soul into even your smallest acts. This is the secret of success.', 'Swami Sivananda'],
	['As we express our gratitude, we must never forget that the highest appreciation is not to utter words, but to live by them.', 'John F. Kennedy'],
	['Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship.', 'Buddha'],
	['It is during our darkest moments that we must focus to see the light.', 'Aristotle Onassis'],
	['No act of kindness, no matter how small, is ever wasted.', 'Aesop'],
	['You must do the things you think you cannot do.', 'Eleanor Roosevelt'],
	['A hero is someone who has given his or her life to something bigger than oneself.', 'Joseph Campbell'],
	['There are two ways of spreading light: to be the candle or the mirror that reflects it.', 'Edith Wharton'],
	['Memories of our lives, of our work and our deeds will continue in others.', 'Rosa Parks'],
	['No matter what people tell you, words and ideas can change the world.', 'Robin Williams'],
	['I believe in living today. Not in yesterday, nor in tomorrow.', 'Loretta Young'],
	['All I can remember were those lonely nights when i was defacing those insecure websites.', 'Bynalab'],
	['It is nice to be important, but it\'s more important to be nice.', 'John Templeton'],
	['A lot of hard work is hidden behind nice things.', 'Ralph Lauren'],
	['I\'m learning to accept myself. I\'m still in the process of learning to love who I am. And it\'s been really refreshing and really nice to be able to do that and be okay. I think my fans have brought that out in me.', 'Dua Lipa'],
	['It is better to lead from behind and to put others in front, especially when you celebrate victory when nice things occur. You take the front line when there is danger. Then people will appreciate your leadership.', 'Nelson Mandela'],
];

// ** - indicates code hasn't been written yet

$(document).ready(function () {

	/**
	 * random index generator
	 * @return {num} [random index between zero and 1 less than the length of the quotes array]
	 */
	var randIndexGen = function () {
		return Math.floor(Math.random() * quotes.length);
	};

	/**
	 * quote generator
	 * @param  {num} index - a random index from the randIndexGen function
	 * @return {string}  an html string that will replace the contents of the '.quote' class
	 */
	var quoteGen = function (index) {
		return "<strong>\"</strong>" + quotes[index][0] + "<strong>\"</strong>";
	};

	/**
	 * author generator
	 * @param  {num} index - a random index from the randIndexGen function
	 * @return {string}       an html string that will replace the contents of the '.author' class
	 */
	var authorGen = function (index) {
		return "- <em>" + quotes[index][1] + "</em>";
	};

	/**
	 * tweet button parameter generator
	 * @param  {string} quoteText - text passed in from the '.quote' class
	 * @return {string}            tweet web intent query parameter
	 */
	var tweetBtnParamGen = function (quoteText) {
		var expression = /\s+/gi;
		quoteText = quoteText.replace(expression, "%20");
		quoteText = "https://twitter.com/intent/tweet?text=" + quoteText;
		console.log(quoteText);
		return quoteText;
	};

	var updateTweet = function (quoteStr) {
		$('.twitter-share-button').attr('href', quoteStr);
	};

	$(".jumbotron").hide().fadeIn(2000);
	$('.title').hide().delay(1500).fadeIn(2000);

	var randIndex = randIndexGen();
	var quote = quoteGen(randIndex);
	var author = authorGen(randIndex);

	$('.quote').html(quote).hide().delay(3000).fadeIn(2000);
	$('.author').html(author).hide().delay(3000).fadeIn(2000);
	$('#btn-ignite').hide().delay(5000).fadeIn(2000);
	$('#tweet-btn').hide().delay(5000).fadeIn(2000);

	// extract text from .quote class
	var quoteVal = $('.quote').text();

	// ** pass text from quoteVal into the tweetBtnParamGen function (maybe use regEx to replace all spaced with '%20')
	// ** use .attr() method to add 'href' with a value of 'quoteVal' into
	quoteVal = tweetBtnParamGen(quoteVal);
	updateTweet(quoteVal);

	$('#btn-ignite').click(function () {

		//Generate a random index to extract an element within the quotes array
		var randIndex = randIndexGen();
		var quote = quoteGen(randIndex);
		var author = authorGen(randIndex);
		// ** .hide() current quote, then append a new quote, hide it, then fade it in

		// ** add twitter button that tweets quote

		// 1. Add '.quote-wrapper' class to the quote container
		// 2. Append inspiration quote inside of the '.quote' class
		// 3. Append quote author inside of the '.author' class

		$('.quote').fadeOut('slow', function () {
			$(this).html(quote).hide().fadeIn(2000);
			var quoteVal = $(this).text();
			quoteVal = tweetBtnParamGen(quoteVal);

			$('#tweet-btn iframe').remove();

			var tweetBtn = $('<a></a>')
				.addClass('twitter-share-button')
				.attr({ 'href': quoteVal, 'data-size': 'large', 'data-hashtags': 'quote' });

			$('#tweet-btn').append(tweetBtn);
			twttr.widgets.load(); //function revaulates <a> tags only, not <iframe> tags - hence the reason for line 113
		});
		$('.author').fadeOut('slow', function () {
			$(this).html(author).hide().fadeIn(2000);
		});
		$('#btn-ignite').fadeOut('slow', function () {
			$(this).hide().delay(2000).fadeIn(2000);
		});
		$('#tweet-btn').fadeOut('slow', function () {
			$(this).hide().delay(2000).fadeIn(2000);
		});
	});
});