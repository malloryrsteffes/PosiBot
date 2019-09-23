# PosiBot

> Posibot is your reliable companion, ready to cheer you up whenever you need! 

## Website

> Visit PosiBot at https://malloryrsteffes.github.io/PosiBot/

## Usage

> You can visit PosiBot whenever you'd like to let him know how you're feeling. Depending on your answer, 
> PosiBot will provide you with different responses.

> Happy users will see funny GIFs.
> Sad users will see a motivational quote.
> Bored users will see Netflix movie suggestions and nearby restaurants.

## Layout and Concept

> PosiBot's site is laid out quite simply. The user has very little to do other than the streamlined conversation with PosiBot.
> Initially, Posibot will ask the user their name, then how they are feeling.
> The user will be given three choices of response (happy, sad, or bored) in the form of buttons. 
> Depending on their mood choice, PosiBot will provide them with an appropriate response.

## Built with:
> HTML/CSS
> The [Materialize Framework]("https://materializecss.com/")
> Javascript/jQuery

## API Information

>**Movie Calling API:** We utilized the Unofficial Netflix Online Global Search (or uNoGS) to provide the users who respond as "bored" with movies currently available on Netflix. The Query URL:

```Javascript
"url": "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get&p=1&t=drama&st=adv",
```

> Optional Parameters include p (page)and t (genre)

> **Motivational Quote API:** We utilized the Universal Inspirational Quotes API Documentation to return a random uplifting quote to users who are feeling sad. The Query URL:

```Javascript
var queryURL = "https://healthruwords.p.rapidapi.com/v1/quotes/?id=&t=" + searchTerm + "&maxR=1&size=large&x-rapidapi-key=?";
```
> Optional Parameters include t (genre), maxR (maxReturn), and size.
> Our searchTerm comes from an array of search terms, helpfully suggested by the API documentation itself.
> Currently, the array includes:

```Javascript
    var quoteTerms = ["Happiness", "Positive", "Kindness", "Motivational", "Positivity", "Healing", "Peace"];
```

> **GIPHY API:** We utilized the GIPHY API to return some funny GIFs for users who say they are in a happy mood. The Query URL:

```Javascript
"https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=?&limit=6%rating=g";
```

> Optional Parameters include q (keyword), limit, and rating.
> Our search Term comes from an array of search items. Currently, the array includes:

```Javascript
        var gifArray = ["funny", "silly", "hilarious", "memes", "fun", "cute", "adorable"]
```

>**Google Maps API** : We utilized the Google Maps API to provide bored users with nearby restaurants they can snack at. The Query URL:


>Optional Parameters include:


## Randomizing the GIF and Motivational Quote APIS
> We knew we wanted to randomize PosiBot's offerings as much as possible. Currently, both the GIF and the Motivational Quote API are randomized properly. In order to do this, we decided to randomize the search terms used in the API Call (we were unable to do this with the uNoGs call, so it is not currently randomized.)

> The code we implemented to randomize the searchTerm is as follows:

```Javascript
    var gifArray = ["funny", "silly", "hilarious", "memes", "fun", "cute", "adorable"]
    var rotate = Math.floor(gifArray.length * Math.random());
    var searchTerm = gifArray[rotate];
```


## Roadmap

> We have several ideas about the future of PosiBot! 
> We would especially like to implement a database and login system to store user's responses over longer periods of time. This would allow for more personalized interaction from PosiBot to the user.
> Currently, the movie-calling API is less than perfect. We would ideally like the movies to be both randomized and linked directly.
> We are also less than thrilled with the quality of the Universal Quotes API, and are hoping to find a better alternative.

## Authors and Acknowledgment 
> UI Design: Gelissa Leveille
> API Calls and Javascript: Aaron Jackson and Mallory Steffes
> PosiBot Character Design: Isaac Cole Jones

> Many thanks to the fantastic instructors at the UCF Boot Camp.