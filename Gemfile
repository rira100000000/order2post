# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.2.2'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails', branch: 'main'
gem 'rails'

# Use postgresql as the database for Active Record
gem 'pg', '~> 1.1'

# Use the Puma web server [https://github.com/puma/puma]
gem 'puma', '~> 6.0'

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem 'byebug'
  gem 'database_cleaner'
  gem 'debug', platforms: %i[mri mingw x64_mingw]
  gem 'fixture_builder'
end

group :development do
  gem 'rubocop'
end

group :test do
  gem 'capybara'
  gem 'capybara-screenshot'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'rspec-rails'
  gem 'selenium-webdriver'
end

gem 'actionmailer'
gem 'devise'
gem 'devise-i18n'
gem 'dockerfile-rails', '>= 1.5'
gem 'dotenv'
gem 'mailgun-ruby'
gem 'meta-tags'
gem 'sentry-rails', '~> 5.12'
gem 'sentry-ruby', '~> 5.12'
gem 'vite_rails', '~> 3.0'
