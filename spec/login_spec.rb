# frozen_string_literal: true
require 'rails_helper'
require_relative './helpers/login_helper'

RSpec.describe 'ログイン、ログアウトのテスト' do
  fixtures :users
  
  it 'トップページからログインページに飛び、ログイン、ログアウトできること' do
    user = users(:minneUser)

    login(user)

    find('#signout_button').click
    
    expect(page).to have_content('CSV変換君')
  end
end

RSpec.describe 'サインアップできること' do
  it 'トップページからサインアップページに飛び、サインアップできること' do
    visit root_path
    expect(page).to have_selector('#signup_button')

    click_on 'signup_button'

    expect(page).to have_selector('#user_email')

    fill_in 'user_email', with: 'test_user@example.com'
    fill_in 'user_password', with: 'password'
    fill_in 'user_password_confirmation', with: 'password'

    click_button 'Sign Up'

    expect(page).to have_current_path(root_path)
  end
end
