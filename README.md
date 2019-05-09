# Slackart

Design it on Slackart, share it on Slack. But big.
<p float="left">
    <img src="https://i.imgur.com/4PxyYov.png" alt="Design it in Slackart..." width="300"/>
    <img src="https://i.imgur.com/xXDWSXa.png" alt="...share it on Slack" width="300"/>
</p>

## Features
* 12+ colours.
* Up to 32x32px images.
* Customisable emoji output; the world is your pallette.
* Save your creations to URL form; revisit them later or share with friends!
* Advanced compression techniques to quash Slack's character limit.
* Pixel grid for maximum control and precision.

## Where are all the emojis?
You'll need to replace `src/config/emojis.json` with the output of your Slack server's [emojis.list](https://api.slack.com/methods/emoji.list) API response. It should look something like:

```
{
    "ok": true,
    "emoji": {
        "emoji1": "https:\/\/emoji.slack-edge.com\/A1234BCDE\/emoji1\/deadbeef00.png",
        "emoji2": "https:\/\/emoji.slack-edge.com\/A1234BCDE\/emoji2\/bad0feed00.png",
        ...
    }
}
```

The default pallette assumes the presence of simple solid colour emojis e.g. `:red:` maps to an emoji of a solid red square.

## Running & Building
Slackart is just your average, happy-go-lucky React app. [Instructions are as standard.](https://facebook.github.io/create-react-app/docs/getting-started)
