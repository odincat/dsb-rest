# DSB-Rest
An self-hosted rest API that give you *direct* access to the content of the [digital black board by heinekingmedia](https://heinekingmedia.de/education/digitales-schwarzes-brett) (DE: "Digitales schwarzes Brett" = DSB).

Get an easy access to your schools substitution plan using this project.

## Features
- *parses* the substitution plan and some more stuff
- Built with Typescript
- Dynamically set config using environment variables

## Requirements
- NodeJS (16 should be fine)
- technical knowledge about how rest apis work
- Working credentials for [dsbmobile.de](https://dsbmobile.de/)
- some motivation to tweak it, so that it fits **your** needs :)

## API Guide
Once you have [configured]() everything properly, you can start the server using `npm run build:start`. This will make sure you are using the latest version of your custom adaptions.
If you see the message that looks a lot like this one `[API] Server DSB-node is listening at http://[::]:7071`, you can use your favourite API client (for example [insomnia](https://insomnia.rest/)) to test it out.

Every response will have the followig elements in it:
```
"meta": This will contain the time when the substitution plan was updated. Please don't mind the space in front of the value, it's not really my fault. (Generally speaking you might want to parse the data further, this approach is really basic).
"content": This contains the actual important data. For example:
    "current" and "upcoming": Will appear if you dont specify it in the request. Both will contain the following:

For the substitution plan:
The date you can find above the plan that also shows you the week type (A / B).
An array containing all of the substitutions.
Each element will have the following data structure (example data):
{
    "affectedClass": "05A", # self explaining, can also be more than one
    "period": "6",
    "newSubject": "---",
    "originalSubject": "Bio",
    "newRoom": "---",
    "originalRoom": "Biologie 1",
    "vtrVon": " ",
    "type": "Entfall",
    "text": " "
}
Please note, that the text is directly parsed from the page, so the results may vary, depending how your school has configured it.

For the infos (these ones are displayed directly above the plan, you may have to tweak this to make it work for you):
An array with all the informations:
"Info 1", "Info 2", "Info 3" ... you get the point.
```

| Route | Response |
| --- | --- |
| /ping | Will give you a classic "Hello world!" Use this to test if you can connect to the API |
| /plan | This will respond with the *current* **and** *upcoming* substitution plan. |
| /plan/current | Returns the current plan with all the items. |
| /plan/upcoming | Returns the upcoming plan with all the items. |
| /plan/:class/current | Only returns the items from the specified class from the *current* substitution plan. |
| /plan/:class/upcoming | Only returns the items from the specified class from the *upcoming* substitution plan. |
| /info | Gets the "header" (= additional announcements / "MOTD") from the substitution plan. Returns both the current and upcoming one. |
| /info/current | Returns the current "header". |
| /info/upcoming | Returns the upcoming "header". |

### Example routes
- `/plan/5a/current` returns all the substitutions from the class 5a (current plan) Reponse:
```
{
  "meta": " Stand: 21.04.2022 13:05",
  "date": "21.4.2022 Donnerstag, Woche A",
  "content": [
    {
        "affectedClass": "05A",
        "period": "1",
        "newSubject": "Ku",
        "originalSubject": "Ku",
        "newRoom": "Kunst 1",
        "originalRoom": "Kunst 1",
        "vtrVon": " ",
        "type": "Vertretung",
        "text": " "
    },
    {
        "affectedClass": "05A",
        "period": "6",
        "newSubject": "---",
        "originalSubject": "Bio",
        "newRoom": "---",
        "originalRoom": "Biologie 1",
        "vtrVon": " ",
        "type": "Entfall",
        "text": " "
    }
  ]
}
```
- `/plan/current/05A` returns the same exact thing :=)
- `/info` returns both the current and upcoming MOTD-Header, nicely seperated

## Configuration
First of all you need to set some environment variables. You can set them or put them into an .env file. It must contain the following:

```
DSB_USERNAME="111111" # DSB username provided by your school
DSB_PASSWORD="password" # DSB password provided by your school
SERVER_IS_DEMO="false" # must either be "true" or "false"
SERVER_NAME="DSB-node" # server name, optional
SERVER_PORT=7071 # server port, by default 7071
SERVER_REFRESH_INVERVAL=30 # refresh interval in minutes
```

Under the hood cheerio is used which allows us to parse the html from the page and use JQuery to interact with it.
What's important to know is that I hardcoded all the table columns to give a more concise name for my usecase 

## Credits
- To get the URL of the current plan I used [this amazing project](https://github.com/TheNoim/DSBAPI)

## Alternatives
- There is a really similar project, which you can check out [here](https://codeberg.org/vertretungsplan/integration-dsb)

## Technologies
- [NodeJS](https://nodejs.org/en/) (big surprise)
- [Typescript](https://www.typescriptlang.org/)
- [Cheerio](https://www.npmjs.com/package/cheerio)
- [Restify](http://restify.com/)

## TODO
- [] GraphQL :O
- [] /plan/:class/current instead of /plan/current/:class -> cleaner solution ?
- [] clean up code 