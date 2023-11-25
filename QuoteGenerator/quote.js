const quotes = {
    "- Walt Disney": '"The Way Get Started Is To Quit Talking And Begin Doing."',
    "- Winston Churchill": '"The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees Opportunity In Every Difficulty."',
    "- Will Rogers": '"Don’t Let Yesterday Take Up Too Much Of Today."',
    "- Unknown": '"You Learn More From Failure Than From Success. Don’t Let It Stop You. Failure Builds Character."',
    "- Vince Lombardi": '"It’s Not Whether You Get Knocked Down, It’s Whether You Get Up."',
    "- Mahatma Gandhi": '"Live as if you were to die tomorrow. Learn as if you were to live forever"',
    "- Martin Luther King Jr": '"Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that."',
    "- Albert Einstein": '"Strive not to be a success, but rather to be of value."',
    "- Florence Nightingale": '"I attribute my success to this: I never gave or took any excuse."',
    "- Michael Jordan": '"I missed more than 9000 shots in my career. I lost almost 300 games. 26 times I been trusted to take the game winning shot and missed. I failed over and over and over again in my life. And that is why I succeed."',
    "- Babe Ruth": '"Every strike brings me closer to the next home run."',
    "- John Lennon": '"Life is what happens to you while you’re busy making other plans."',
    "- Earl Nightingale": '"We become what we think about."',
    "- Mark Twain": '"Twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did do, so throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails.  Explore, Dream, Discover."',
    "- Charles Swindoll": '"Life is 10% what happens to me and 90% of how I react to it."',
    "- Buddah": '"The mind is everything. What you think you become."',
    "- Chinese Proverb": '"The best time to plant a tree was 20 years ago. The second best time is now."',
    "- Woody Allen": '"Eighty percent of success is showing up."',
    "- Steve Jobs": '"Your time is limited, so don’t waste it living someone else’s life."',
    "- Vince Lombardi": '"Winning isn’t everything, but wanting to win is."',
    "- Stephen Covey": '"I am not a product of my circumstances. I am a product of my decisions. "',
    "- Christopher Columbus": '"You can never cross the ocean until you have the courage to lose sight of the shore."',
    "- Maya Angelou": '"I’ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel. "',
    "- Dan Millman": '"You don’t have to control your thoughts. You just have to stop letting them control you."',
    "- Henry Ford": '"Whether you think you can or you think you can’t, you’re right."',
    "- Maya Angelou": '"And still, I rise."',
    "- Zig Ziglar": '"People often say that motivation doesn’t last. Well, neither does bathing.  That’s why we recommend it daily."',
    "- Aristotle": '"There is only one way to avoid criticism: do nothing, say nothing, and be nothing"',
    "- Jesus": '"Ask and it will be given to you; search, and you will find; knock and the door will be opened for you."',
    "- Ralph Waldo Emerson": '"The only person you are destined to become is the person you decide to be."',
    "- Henry David Thoreau": '"Go confidently in the direction of your dreams.  Live the life you have imagined."',
    "- Russ Harris": '"Slow breathing is like an anchor in the midst of an emotional storm: the anchor won’t make the storm go away, but it will hold you steady until it passes."',
    "- Nido Qubein": '"Your present circumstances don’t determine where you go; they merely determine where you start."'
  };


document.querySelector("#generate").addEventListener("click", () => {
  generate();
});

function generate(){
  // grab all the keys in the dictionary (authors) and store in an array
  const authors = Object.keys(quotes);
  // grab a random key (author) and store it in author
  const author = authors[Math.floor(Math.random() * authors.length)];
  // grab the value(quote) that belongs to that key
  const quote = quotes[author]

  document.querySelector("#quote").textContent = quote;
  document.querySelector("#author").textContent = author;
}

window.onload = function(){
  generate()
}