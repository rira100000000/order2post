# frozen_string_literal: true

Rails.application.routes.draw do
  root 'top#index'

  resources :conversions, only: [:index, :create]
  resources :converteds, only: [:index, :create]
  resources :usage, only: [:index]
  resources :terms, only: [:index]
  resources :privacy_policy, only: [:index]
  resources :cancellation, only: [:index]
  devise_for :users, controllers: {
  registrations: 'users/registrations'
}

  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end
end
