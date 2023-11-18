# frozen_string_literal: true

Rails.application.routes.draw do
  root 'top#index'
  get 'spreadsheet', to: 'spreadsheet#index'
  get 'conversions', to: 'conversions#index'
  post '/conversions', to: 'conversions#submit'
  get '/converteds', to: 'converteds#index'
  post '/converteds', to: 'converteds#submit'
  get '/usage', to: 'usage#index'

  devise_for :users
  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end
end
