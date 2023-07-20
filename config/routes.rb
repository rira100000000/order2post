Rails.application.routes.draw do
  root 'home#index'
  get 'spreadsheet', to: 'spreadsheet#index'

  devise_for :users
  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end
end
