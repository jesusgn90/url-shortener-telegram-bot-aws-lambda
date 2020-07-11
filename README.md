# URL shortener Telegram bot using AWS Lambda

Based on tutorial seen here: https://iamondemand.com/blog/building-your-first-serverless-telegram-bot/.

### Install dependencies

```sh
yarn global add serverless
yarn install
```

### Obtain a Telegram bot token

Chat with [@BotFather](https://telegram.me/BotFather) to create a new bot, then copy the generated token.

### Setup serverless.yml

```sh
cp serverless.yml.example serverless.yml
```

Now, edit `serverless.yml` and change the `service` name and the `TELEGRAM_TOKEN` value.

### Deploy the application

```sh
yarn deploy
```

Copy the endpoint URL, you should see something like this:

```sh
endpoints:
  POST - https://XXXXXXX.execute-api.us-west-2.amazonaws.com/dev/short-bot
```

Set the webhook URL for the Telegram bot:

```sh
TELEGRAM_TOKEN="YOUR_TOKEN_HERE"
SERVERLESS_URI="https://XXXXXXX.execute-api.us-west-2.amazonaws.com/dev/short-bot"
curl --request POST \
  --url "https://api.telegram.org/bot$TELEGRAM_TOKEN/setWebhook" \
  --header "content-type: application/json" \
  --data "{\"url\": \"$SERVERLESS_URI\"}"
```