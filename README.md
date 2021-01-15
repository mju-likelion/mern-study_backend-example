# MERN (Mongo - Express(Koa) - React - Node) stack study - Backend

멋쟁이 사자처럼 명지대(자연) 8기 마지막 스터디

## Requirements

- Node.js

```shell
# using homebrew in macOS
brew install node
```

- MongoDB

```shell
# using homebrew in macOS
brew tap mongodb/brew
brew install mongodb-community@4.4

# using Docker
docker run -d -p 27017:27017 mongo
```

- Yarn

```shell
# using homebrew in macOS
brew install yarn

# using npm
npm install --global yarn
```

## environment file

- .env

```
PORT: port number of this project. optional.
MONGO_URI: mongodb uri. required.
JWT_SECRET: jwt secret token for generate token. required.
```
