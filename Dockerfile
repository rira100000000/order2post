FROM ruby:3.2.2

RUN apt-get update -qq && apt-get install -y nodejs npm postgresql-client

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

RUN npm install && npm install -g yarn
RUN yarn install
RUN bin/vite build

CMD ["./bin/rails", "server", "-b", "0.0.0.0"]
