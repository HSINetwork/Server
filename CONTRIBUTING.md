# Contributions
Contributions are welcome! Anyone can contribute, but we recommended you to follow these guidelines before contributing,
and some checklists to make sure some things don't turn out bad in the long run.

## Guidelines and checks

### Guidelines
Don't leak private info like API keys out into the code, instead, save it as a secret in your repo.

Don't add too many tests to the project for every single possible edge-case,
code that is confirmed to work does not need testing, stuff like UIs
should need testing but not basic updating a database key using a pre-
declared function.

Don't over comment things, readablity is a thing, and we do try to help with that. If it's some mess like a complicated function,
yes, put it in comments what it's doing, but please don't do it for every single line [Note: Snowpack should automatically remove
comments as part of the building process, so speed isn't a concern.].

### Checklist
Please check that these succeed without errors:
* docker-compose up
* cypress tests
* jest tests
[docker-compose up fails if any of the containers go offline for any reason]
